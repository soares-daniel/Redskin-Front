"use client"
// filterDropdown.tsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import EventTypesContext from '@/components/EventTypesContext';

interface FilterDropdownProps {
  onFilterChange: (filteredIds: number[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const eventTypes = useContext(EventTypesContext);
  const [selectedEventTypes, setSelectedEventTypes] = useState<number[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); 

  useEffect(() => {
    setSelectedEventTypes(eventTypes.map(et => et.id));
  }, [eventTypes]);

  const handleCheckboxChange = (id: number) => {
    if (selectedEventTypes.includes(id)) {
        setSelectedEventTypes(prevState => prevState.filter(i => i !== id));
    } else {
        setSelectedEventTypes(prevState => [...prevState, id]);
    }
  };

  const applyFilters = () => {
    onFilterChange(selectedEventTypes);
    setDropdownOpen(false);
  }

  // Function to check if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    // Attach the click outside listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div style={{ marginBottom: '20px' }} ref={dropdownRef}>
      <button 
        ref={buttonRef}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        style={{
          backgroundColor: '#FAEFEF',
          borderRadius: '8px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          padding: '8px 12px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Filters
      </button>

      {isDropdownOpen && ( 
        <div className="dropdown-content">
          {eventTypes.map(eventType => (
            <div key={eventType.id} className="checkbox-item">
              <input 
                type="checkbox"
                checked={selectedEventTypes.includes(eventType.id)}
                onChange={() => handleCheckboxChange(eventType.id)}
                className="checkbox"
              />
              <span className="checkbox-label">{eventType.description}</span>
            </div>
          ))}
          <button onClick={applyFilters} className="apply-btn">Apply</button>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
