import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils'; // Pastikan Anda mengimpor colors dari file utils

export default function CalendarView() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date(); // Tanggal hari ini

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        if (direction === 'prev') {
            newMonth.setMonth(newMonth.getMonth() - 1);
        } else if (direction === 'next') {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        setCurrentMonth(newMonth);
    };

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
        );
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(month, year);
        const firstDay = getFirstDayOfMonth(month, year);

        const blanks = [];
        for (let i = 0; i < firstDay; i++) {
            blanks.push(<Text key={`blank-${i}`} style={styles.cell}></Text>);
        }

        const days = [];
        for (let d = 1; d <= daysInMonth; d++) {
            days.push(
                <View key={`day-${d}`} style={styles.cell}>
                    {isToday(d) ? (
                        <View style={styles.todayMarker}>
                            <Text style={styles.todayText}>{d}</Text>
                        </View>
                    ) : (
                        <Text style={styles.cellText}>{d}</Text>
                    )}
                </View>
            );
        }

        const totalSlots = [...blanks, ...days];
        const rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        return rows.map((row, i) => (
            <View key={`row-${i}`} style={styles.row}>
                {row}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <TouchableOpacity onPress={() => changeMonth('prev')}>
                    <Text style={styles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.monthText}>{monthNames[currentMonth.getMonth()]}</Text>
                <TouchableOpacity onPress={() => changeMonth('next')}>
                    <Text style={styles.arrow}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.calendarContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerCell}>S</Text>
                    <Text style={styles.headerCell}>S</Text>
                    <Text style={styles.headerCell}>R</Text>
                    <Text style={styles.headerCell}>K</Text>
                    <Text style={styles.headerCell}>J</Text>
                    <Text style={styles.headerCell}>S</Text>
                    <Text style={styles.headerCell}>M</Text>
                </View>
                {renderCalendar()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    monthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrow: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    cellText: {
        textAlign: 'center',
    },
    todayMarker: {
        backgroundColor: colors.primary, // Warna primary dari utils
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayText: {
        color: 'white', // Teks putih untuk tanggal hari ini
        textAlign: 'center',
    },
});