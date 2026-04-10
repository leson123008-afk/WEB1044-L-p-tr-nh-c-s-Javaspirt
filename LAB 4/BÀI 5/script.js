// ── Storage ──────────────────────────────────────────────
const STORAGE_KEY = 'studenthub_data';

function loadData() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
}

function saveData(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

let students = loadData();

// ── Helpers ───────────────────────────────────────────────
function getGrade(gpa) {
    if (gpa >= 8.5) return { label: 'Xuất sắc', cls: 'badge-excellent' };
    if (gpa >= 7.0) return { label: 'Giỏi', cls: 'badge-good' };
    if (gpa >= 5.5) return { label: 'Khá', cls: 'badge-average' };
    if (gpa >= 4.0) return { label: 'Trung bình', cls: 'badge-below' };
    return { label: 'Yếu/Kém', cls: 'badge-fail' };
}

function generateId() {
    return 'sv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function showToast(msg, duration = 2500) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration);
}

// ── Navigation ────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        item.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
        if (tab === 'stats') renderStats();
    });
});

// ── Render Table ──────────────────────────────────────────
function renderTable(list) {
    const tbody = document.getElementById('tableBody');
    const empty = document.getElementById('emptyState');

    if (!list.length) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';

    tbody.innerHTML = list.map(s => {
        const grade = getGrade(parseFloat(s.gpa));
        return `
      <tr>
        <td><span class="mssv-cell">${s.mssv}</span></td>
        <td><span class="name-cell">${s.name}</span></td>
        <td>${s.className}</td>
        <td><span class="gpa-cell">${parseFloat(s.gpa).toFixed(1)}</span></td>
        <td><span class="badge ${grade.cls}">${grade.label}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-icon-sm" onclick="editStudent('${s.id}')" title="Sửa">✏️</button>
            <button class="btn-icon-sm del" onclick="confirmDelete('${s.id}', '${s.name}')" title="Xóa">🗑</button>
          </div>
        </td>
      </tr>`;
    }).join('');
}

function refreshTable() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const cls = document.getElementById('filterClass').value;

    let filtered = students.filter(s => {
        const matchSearch = !search ||
            s.name.toLowerCase().includes(search) ||
            s.mssv.toLowerCase().includes(search);
        const matchClass = !cls || s.className === cls;
        return matchSearch && matchClass;
    });

    renderTable(filtered);
    document.getElementById('totalCount').textContent = students.length;
}

function refreshClassFilter() {
    const select = document.getElementById('filterClass');
    const cur = select.value;
    const classes = [...new Set(students.map(s => s.className))].sort();
    select.innerHTML = '<option value="">Tất cả lớp</option>' +
        classes.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');
}

// ── Form ──────────────────────────────────────────────────
function resetForm() {
    ['fMssv', 'fName', 'fClass', 'fDob', 'fGpa', 'fEmail'].forEach(id => {
        document.getElementById(id).value = '';
        document.getElementById(id).classList.remove('error');
    });
    ['errMssv', 'errName', 'errClass', 'errGpa'].forEach(id => {
        document.getElementById(id).textContent = '';
    });
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'Thêm sinh viên mới';
    document.getElementById('submitBtn').innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> Lưu sinh viên`;
}

function validate() {
    let ok = true;
    const fields = [
        { id: 'fMssv', err: 'errMssv', msg: 'Vui lòng nhập MSSV' },
        { id: 'fName', err: 'errName', msg: 'Vui lòng nhập họ tên' },
        { id: 'fClass', err: 'errClass', msg: 'Vui lòng nhập lớp' },
        { id: 'fGpa', err: 'errGpa', msg: 'Vui lòng nhập điểm TB' },
    ];
    fields.forEach(f => {
        const el = document.getElementById(f.id);
        const errEl = document.getElementById(f.err);
        if (!el.value.trim()) {
            el.classList.add('error');
            errEl.textContent = f.msg;
            ok = false;
        } else {
            el.classList.remove('error');
            errEl.textContent = '';
        }
    });

    const gpa = parseFloat(document.getElementById('fGpa').value);
    if (document.getElementById('fGpa').value && (isNaN(gpa) || gpa < 0 || gpa > 10)) {
        document.getElementById('fGpa').classList.add('error');
        document.getElementById('errGpa').textContent = 'Điểm phải từ 0 đến 10';
        ok = false;
    }

    // MSSV unique check
    const mssv = document.getElementById('fMssv').value.trim();
    const editId = document.getElementById('editId').value;
    if (mssv && students.some(s => s.mssv === mssv && s.id !== editId)) {
        document.getElementById('fMssv').classList.add('error');
        document.getElementById('errMssv').textContent = 'MSSV đã tồn tại';
        ok = false;
    }

    return ok;
}

function submitForm() {
    if (!validate()) return;

    const editId = document.getElementById('editId').value;
    const student = {
        id: editId || generateId(),
        mssv: document.getElementById('fMssv').value.trim(),
        name: document.getElementById('fName').value.trim(),
        className: document.getElementById('fClass').value.trim(),
        dob: document.getElementById('fDob').value,
        gpa: parseFloat(document.getElementById('fGpa').value),
        email: document.getElementById('fEmail').value.trim(),
    };

    if (editId) {
        const idx = students.findIndex(s => s.id === editId);
        students[idx] = student;
        showToast('✅ Đã cập nhật thông tin sinh viên');
    } else {
        students.push(student);
        showToast('✅ Đã thêm sinh viên mới');
    }

    saveData(students);
    refreshClassFilter();
    refreshTable();
    resetForm();

    // switch to list
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="list"]').classList.add('active');
    document.getElementById('tab-list').classList.add('active');
}

function editStudent(id) {
    const s = students.find(sv => sv.id === id);
    if (!s) return;

    document.getElementById('editId').value = s.id;
    document.getElementById('fMssv').value = s.mssv;
    document.getElementById('fName').value = s.name;
    document.getElementById('fClass').value = s.className;
    document.getElementById('fDob').value = s.dob || '';
    document.getElementById('fGpa').value = s.gpa;
    document.getElementById('fEmail').value = s.email || '';

    document.getElementById('formTitle').textContent = 'Chỉnh sửa thông tin';
    document.getElementById('submitBtn').innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> Cập nhật`;

    // switch to add tab
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="add"]').classList.add('active');
    document.getElementById('tab-add').classList.add('active');
}

// ── Delete ────────────────────────────────────────────────
let pendingDeleteId = null;

function confirmDelete(id, name) {
    pendingDeleteId = id;
    document.getElementById('modalDesc').textContent = `Bạn có chắc muốn xóa sinh viên "${name}"?`;
    document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    pendingDeleteId = null;
}

document.getElementById('confirmDelete').addEventListener('click', () => {
    if (!pendingDeleteId) return;
    students = students.filter(s => s.id !== pendingDeleteId);
    saveData(students);
    refreshClassFilter();
    refreshTable();
    closeModal();
    showToast('🗑️ Đã xóa sinh viên');
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ── Search / Filter ───────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', refreshTable);
document.getElementById('filterClass').addEventListener('change', refreshTable);

// ── Stats ─────────────────────────────────────────────────
function renderStats() {
    const grid = document.getElementById('statsGrid');
    const bars = document.getElementById('chartBars');

    if (!students.length) {
        grid.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Chưa có dữ liệu để thống kê.</div>';
        bars.innerHTML = '';
        return;
    }

    const total = students.length;
    const avgGpa = students.reduce((s, sv) => s + sv.gpa, 0) / total;
    const maxGpa = Math.max(...students.map(s => s.gpa));
    const minGpa = Math.min(...students.map(s => s.gpa));

    grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-card-label">Tổng sinh viên</div>
      <div class="stat-card-value">${total}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Điểm TB chung</div>
      <div class="stat-card-value">${avgGpa.toFixed(2)}</div>
      <div class="stat-card-sub">trên thang 10</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Điểm cao nhất</div>
      <div class="stat-card-value">${maxGpa.toFixed(1)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Điểm thấp nhất</div>
      <div class="stat-card-value">${minGpa.toFixed(1)}</div>
    </div>
  `;

    const grades = [
        { label: 'Xuất sắc', min: 8.5, max: 10, color: '#16a34a' },
        { label: 'Giỏi', min: 7.0, max: 8.5, color: '#2563eb' },
        { label: 'Khá', min: 5.5, max: 7.0, color: '#ca8a04' },
        { label: 'TB', min: 4.0, max: 5.5, color: '#ea580c' },
        { label: 'Yếu/Kém', min: 0, max: 4.0, color: '#dc2626' },
    ];

    bars.innerHTML = grades.map(g => {
        const count = students.filter(s => s.gpa >= g.min && s.gpa < g.max).length;
        const pct = total ? Math.round((count / total) * 100) : 0;
        return `
      <div class="bar-row">
        <div class="bar-label">${g.label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct}%; background:${g.color}">
            ${pct > 8 ? pct + '%' : ''}
          </div>
        </div>
        <div class="bar-count">${count}</div>
      </div>`;
    }).join('');
}

// ── Seed data (demo) ──────────────────────────────────────
function seedIfEmpty() {
    if (students.length > 0) return;
    const demo = [
        { mssv: 'SV001', name: 'Nguyễn Văn An', className: 'CNTT01', dob: '2003-05-12', gpa: 8.7, email: 'an@email.com' },
        { mssv: 'SV002', name: 'Trần Thị Bích', className: 'CNTT01', dob: '2003-08-20', gpa: 7.4, email: 'bich@email.com' },
        { mssv: 'SV003', name: 'Lê Hoàng Minh', className: 'CNTT02', dob: '2002-11-03', gpa: 6.1, email: '' },
        { mssv: 'SV004', name: 'Phạm Thị Lan', className: 'CNTT02', dob: '2003-02-28', gpa: 5.0, email: 'lan@email.com' },
        { mssv: 'SV005', name: 'Hoàng Đức Tùng', className: 'CNTT01', dob: '2002-07-15', gpa: 3.5, email: '' },
        { mssv: 'SV006', name: 'Vũ Thị Hoa', className: 'KTPM01', dob: '2003-09-09', gpa: 9.2, email: 'hoa@email.com' },
        { mssv: 'SV007', name: 'Đặng Văn Long', className: 'KTPM01', dob: '2002-04-17', gpa: 7.8, email: '' },
    ].map(s => ({ ...s, id: generateId() }));

    students = demo;
    saveData(students);
}

// ── Init ──────────────────────────────────────────────────
seedIfEmpty();
refreshClassFilter();
refreshTable();