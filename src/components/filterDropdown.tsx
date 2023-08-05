"use client"
// filterDropdown.tsx
import React, { useState, useContext, useEffect } from 'react';
import EventTypesContext from '@/components/EventTypesContext';

interface FilterDropdownProps {
  onFilterChange: (filteredIds: number[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const eventTypes = useContext(EventTypesContext);
  const [selectedEventTypes, setSelectedEventTypes] = useState<number[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false); 

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

  return (
    <div>
      <button onClick={() => setDropdownOpen(!isDropdownOpen)}>Filters</button>

      {isDropdownOpen && ( 
        <div className="dropdown-content">
          {eventTypes.map(eventType => (
            <div key={eventType.id}>
              <input 
                type="checkbox"
                checked={selectedEventTypes.includes(eventType.id)}
                onChange={() => handleCheckboxChange(eventType.id)}
              />
              {eventType.name}
            </div>
          ))}
          <button onClick={applyFilters}>Apply</button>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;

<style jsx>
{`
  .dropdown-content {
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    background-color: #fff;
    width: 200px; // adjust as needed
    z-index: 10; // ensure it floats above other content
  }
`}
</style>
