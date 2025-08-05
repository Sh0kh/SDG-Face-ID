import { Search, Plus, MoreVertical, Eye, Fingerprint, Users, Monitor, ChevronDown, Edit2, FileText, DollarSign, Download, Upload, Printer, Filter, X, Check } from 'lucide-react';
import { useState } from 'react';

const FilterHeader = ({ label, value, options, active, onToggle, onSelect }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center  space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
      style={{ zIndex: 50, position: "relative" }} 
    >
      <span>{value}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
    {active && (
      <div
        className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px]"
        style={{
          zIndex: 100,
          top: "260px",
          transform: "translateX(-50%)"
        }}
      >
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

const FilterCheckbox = ({ label, checked, onChange, count }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-5 h-5 border-2 rounded ${checked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      <span className="text-gray-700 text-sm">{label}</span>
    </div>
    {typeof count === 'number' && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">{count}</span>}
  </label>
);

const AlphabetTabs = ({ tabs, active, onChange }) => (
  <div className="flex space-x-0 border-b border-gray-200">
    {tabs.map((t, i) => (
      <button
        key={t}
        className={`pb-3 px-4 font-medium text-sm ${
          active === t
            ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50/50"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => onChange(t)}
      >
        {t}
      </button>
    ))}
  </div>
);

export default function Employees() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredEmployee, setHoveredEmployee] = useState(null);
  const [showEditTooltip, setShowEditTooltip] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState({ qidiruv: '', barchasi: false, boshqaruv: false, defaultDepartment: false, ishlabChiqarish: false });
  const [appliedFilters, setAppliedFilters] = useState({ qidiruv: '', barchasi: false, boshqaruv: false, defaultDepartment: false, ishlabChiqarish: false });
  const [currentFilters, setCurrentFilters] = useState({ name: "To'liq ismi", startDate: "Ish boshlangan sana", department: "Bo'lim", position: "Lavozim" });
  const [activeTab, setActiveTab] = useState("Barchasi");

  const filterOptions = {
    name: ["To'liq ismi", "O'sishi bo'yicha", "Kamayishi bo'yicha"],
    startDate: ["Ish boshlangan sana", "Pin kod", "Tab. №", "Ish jadvali"],
    department: ["Bo'lim", "IT Department", "Ishlab chiqarish", "Moliya", "Marketing"],
    position: ["Lavozim", "Manager", "Developer", "Designer", "Analyst"]
  };

  const menuItems = [
    { icon: FileText, label: "Xodimlar beykatlari", color: "text-green-600" },
    { icon: FileText, label: "Xodimlar arxivi", color: "text-gray-600" },
    { icon: Edit2, label: "Ommaviy tahrirlash", color: "text-gray-600" },
    { icon: DollarSign, label: "Oylik maoshlarni tahrirlash", color: "text-gray-600" },
    { icon: Upload, label: "Eksport", color: "text-green-600" },
    { icon: Download, label: "Import", color: "text-green-600" },
    { icon: Printer, label: "Chop etish", color: "text-gray-600" }
  ];

  const mockEmployees = [
    { id: 1, initials: "JT", name: "Jurabek Toshbekov", role: "TIZIM ADMINISTRATORI", employeeId: "31.07.25", department: "Default Department", position: "Default Position", isOnline: false },
    { id: 2, initials: "OO", name: "Oybek Oybek", role: "", employeeId: "01.08.25", department: "Ishlab chiqarish", position: "Default Position", isOnline: true }
  ];

  const filteredEmployees =
    activeTab === "Barchasi"
      ? mockEmployees
      : mockEmployees.filter((e) => e.name[0].toUpperCase() === activeTab);

  const handleFilterChange = (type, value) => { setCurrentFilters(f => ({ ...f, [type]: value })); setActiveDropdown(null); };
  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);
  const handleMenuItemClick = () => setActiveDropdown(null);
  const openFilterModal = () => { setTempFilters(appliedFilters); setShowFilterModal(true); };
  const closeFilterModal = () => setShowFilterModal(false);
  const handleTempFilterChange = (name, checked) => setTempFilters(f => ({ ...f, [name]: checked }));
  const handleQidiruvChange = (v) => setTempFilters(f => ({ ...f, qidiruv: v }));
  const applyFilters = () => { setAppliedFilters(tempFilters); setShowFilterModal(false); };
  const getSelectedFiltersCount = () => Object.entries(appliedFilters).filter(([k, v]) => k !== 'qidiruv' && v).length;

  return (
    <div className="bg-gray-50  min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900">Xodimlar</h1>
            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-sm font-medium">2</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <button onClick={openFilterModal} className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 mr-2">
                <Filter className="w-4 h-4 text-gray-600" />
                {getSelectedFiltersCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getSelectedFiltersCount()}
                  </span>
                )}
              </button>
              <input type="text" placeholder="To'liq ismi" className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 bg-white" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /><span>Qo'shish</span>
            </button>
            <div className="relative">
              <button onClick={() => toggleDropdown('menu')} className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
              {activeDropdown === 'menu' && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20 min-w-[220px]">
                  {menuItems.map((item, i) => (
                    <button key={i} onClick={handleMenuItemClick} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6">
          <AlphabetTabs
            tabs={["Barchasi", ...Array.from(new Set(mockEmployees.map(e => e.name[0].toUpperCase())))]}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
      <div className="bg-white mx-6 mt-6 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["name", "startDate", "department", "position"].map((type) => (
                  <th key={type} className="px-6 py-4 text-left relative">
                    <FilterHeader
                      label={type}
                      value={currentFilters[type]}
                      options={filterOptions[type]}
                      active={activeDropdown === type}
                      onToggle={() => toggleDropdown(type)}
                      onSelect={(v) => handleFilterChange(type, v)}
                    />
                  </th>
                ))}
                <th className="px-6 py-4 text-left"><div className="text-sm text-gray-600 font-medium">Identifikatsiya</div></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => (
                <tr key={e.id} className={`border-b border-gray-100 transition-all duration-200 relative ${hoveredEmployee === e.id ? 'bg-yellow-50' : 'hover:bg-yellow-50'}`}
                  onMouseEnter={() => setHoveredEmployee(e.id)} onMouseLeave={() => setHoveredEmployee(null)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${e.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>{e.initials}</div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{e.name}</div>
                        {e.role && <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mt-1 inline-block font-medium">{e.role}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 text-sm font-medium">{e.employeeId}</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">{e.department}</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">{e.position}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {[Eye, Fingerprint, Users, Monitor].map((Icon, i) => (
                        <button key={i} className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Icon className={`w-4 h-4 ${Icon === Users ? (e.isOnline ? 'text-green-500' : 'text-gray-400') : 'text-gray-400'}`} />
                        </button>
                      ))}
                    </div>
                  </td>
                  {hoveredEmployee === e.id && (
                    <td className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="relative">
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg shadow-sm transition-colors"
                          onMouseEnter={() => setShowEditTooltip(e.id)} onMouseLeave={() => setShowEditTooltip(null)}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {showEditTooltip === e.id && (
                          <div className="absolute right-0 bottom-full mb-2 z-20">
                            <div className="bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                              Profilni tahrirlash!!!
                              <div className="absolute top-full right-4 border-4 border-transparent border-t-cyan-600"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
          Elementlar soni 1—{filteredEmployees.length} jami {filteredEmployees.length}.
        </div>
      </div>
      {activeDropdown && (
        <div className="fixed inset-0 z-0" onClick={() => setActiveDropdown(null)} />
      )}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeFilterModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-[900px] mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Xodimlar filtri</h2>
              <button onClick={closeFilterModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Qidiruv" value={tempFilters.qidiruv} onChange={e => handleQidiruvChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50" />
              <div className="space-y-3">
                <FilterCheckbox label="Barchasi" checked={tempFilters.barchasi} onChange={e => handleTempFilterChange('barchasi', e.target.checked)} />
                <FilterCheckbox label="Boshqaruv" checked={tempFilters.boshqaruv} onChange={e => handleTempFilterChange('boshqaruv', e.target.checked)} count={0} />
                <FilterCheckbox label="Default Department" checked={tempFilters.defaultDepartment} onChange={e => handleTempFilterChange('defaultDepartment', e.target.checked)} count={1} />
                <FilterCheckbox label="Ishlab chiqarish" checked={tempFilters.ishlabChiqarish} onChange={e => handleTempFilterChange('ishlabChiqarish', e.target.checked)} count={1} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">Tanlangan xodimlar soni: <span className="font-medium text-teal-600">0</span></div>
              <button onClick={applyFilters} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors">
                <Check className="w-4 h-4" />
                <span>Qo'llash</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}