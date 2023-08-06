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
    <div className="relative">
      <button 
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="bg-red-50 text-black p-2 rounded-t-md w-full text-left flex justify-between items-center"
      >
        Filters
        <span className={`arrow ${isDropdownOpen ? 'arrow-up' : 'arrow-down'}`}></span>
      </button>
  
      {isDropdownOpen && ( 
        <div className="absolute top-full w-full rounded-b-md bg-red-50">
          {eventTypes.map(eventType => (
            <div key={eventType.id} className="checkbox-item py-2 px-4">
              <input 
                type="checkbox"
                checked={selectedEventTypes.includes(eventType.id)}
                onChange={() => handleCheckboxChange(eventType.id)}
                className="checkbox mr-2"
              />
              {eventType.description}
            </div>
          ))}
          <button onClick={applyFilters} className="block w-full p-2 bg-blue-500 text-white rounded-b-md">Apply</button>
        </div>
      )}
    </div>
  );
  
  
  
}

export default FilterDropdown;
