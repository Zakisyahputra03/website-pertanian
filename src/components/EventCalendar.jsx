import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import './EventCalendar.css';

const EventCalendar = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const events = [
        { date: '2026-03-12', title: 'Sosialisasi Pupuk Bersubsidi se-Sumbar', time: '09:00 WIB', location: 'Aula Dinas Pertanian, Padang' },
        { date: '2026-03-15', title: 'Panen Raya Padi Anak Daro', time: '08:00 WIB', location: 'Koto Baru, Kab. Solok' },
        { date: '2026-03-18', title: 'Pasar Tani Murah Jelang Ramadhan', time: '07:00 WIB', location: 'Halaman Kantor Distan, Padang' },
        { date: '2026-03-20', title: 'Bimbingan Teknis Smart Farming Milenial', time: '10:00 WIB', location: 'BPP Payakumbuh' },
        { date: '2026-03-25', title: 'Rapat Koordinasi Ketahanan Pangan Nasional', time: '13:00 WIB', location: 'Kantor Gubernur Sumbar' },
        { date: '2026-03-28', title: 'Monitoring Penyaluran Benih Padi Utama', time: '09:00 WIB', location: 'Kab. Padang Pariaman' },
        { date: '2026-04-02', title: 'Workshop Pengendalian Hama Terpadu', time: '08:30 WIB', location: 'BPP Kec. Harau, Lima Puluh Kota' },
        { date: '2026-04-05', title: 'Festival Bunga & Buah Nusantara', time: '09:00 WIB', location: 'Kawasan Wisata Bukittinggi' },
        { date: '2026-04-10', title: 'Fasilitasi Sertifikasi Organik Kelompok Tani', time: '10:00 WIB', location: 'Kab. Tanah Datar' }
    ];

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderHeader = () => {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return (
            <div className="calendar-header">
                <div className="header-info">
                    <CalendarIcon className="header-icon" />
                    <h2>Agenda Kegiatan</h2>
                </div>
                <div className="calendar-nav">
                    <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={20} /></button>
                    <span className="current-month">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={nextMonth} className="nav-btn"><ChevronRight size={20} /></button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        return (
            <div className="calendar-weekdays">
                {days.map(day => <div key={day} className="weekday">{day}</div>)}
            </div>
        );
    };

    const renderCells = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const cells = [];

        // Fill empty cells for previous month
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
        }

        // Fill real dates
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = events.some(e => e.date === dateStr);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const isSelected = selectedDate.toDateString() === new Date(year, month, day).toDateString();

            cells.push(
                <div
                    key={day}
                    className={`calendar-cell ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                >
                    <span className="day-number">{day}</span>
                    {hasEvent && <span className="event-dot"></span>}
                </div>
            );
        }

        return <div className="calendar-grid">{cells}</div>;
    };

    const renderEventList = () => {
        const activeDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === activeDateStr);

        return (
            <div className="event-sidebar">
                <div className="sidebar-header">
                    <h3>{selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</h3>
                    <p>Daftar Agenda & Kegiatan Kedinasan</p>
                </div>
                <div className="event-list">
                    {dayEvents.length > 0 ? (
                        dayEvents.map((event, idx) => (
                            <div key={idx} className="event-item">
                                <div className="event-content">
                                    <h4>{event.title}</h4>
                                    <div className="event-meta">
                                        <div className="meta-item"><Clock size={16} /> <span>{event.time}</span></div>
                                        <div className="meta-item"><MapPin size={16} /> <span>{event.location}</span></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-event">
                            <CalendarIcon size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Tidak ada agenda kegiatan untuk tanggal ini.</p>
                        </div>
                    )}
                </div>
                <button className="view-full-agenda" onClick={() => navigate('/agenda')}>Lihat Kalender Lengkap</button>
            </div>
        );
    };

    return (
        <section className="calendar-section reveal">
            <div className="container">
                <div className="calendar-card-premium">
                    <div className="calendar-main">
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}
                    </div>
                    {renderEventList()}
                </div>
            </div>
        </section>
    );
};

export default EventCalendar;
