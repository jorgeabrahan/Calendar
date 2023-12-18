import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from "../";
import { getMessagesEs, localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()
  const [lastView] = useState(localStorage.getItem('lastView') || 'week')
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {style}
  }
  const onDoubleClick = () => {
    openDateModal()
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  }
  const onViewChanges = (event) => {
    localStorage.setItem('lastView', event)
  }
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanges}
      />
      <CalendarModal />
      <FabAddNew />
    </>
  );
}
