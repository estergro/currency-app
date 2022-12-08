import { useEffect, useState } from "react"
import { Between } from "UIKit"
import Icon from "../Icon/Icon.jsx"
import './Dropdown.css'

export const Dropdown = ({ optionlist, selected, def, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.addEventListener('click', hideItems);

        return () => {
            document.body.removeEventListener('click', hideItems);
        }
    }, []);

    const hideItems = () => {
        setIsOpen(false);
    }

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen((!isOpen));
    }

    const handleSelect = (i) => {
        onChange(i.id);         
    }

    const renderTitle = () => {
        if (selected) {
            const item = optionlist.find(i => i.id === selected);
            if (item) {
                return item.value;
            }
        }
        return def ? def : 'Please select'
    }

    const renderList = () => {   
        return optionlist.map(i => {
            const className = i.id === selected ? 'selected' : '';
            return <h4
                key={i.id}
                className={className}
                onClick={() => handleSelect(i)}>
                {i.value}</h4>
        })

    }

    return (
        <div className="Dropdown">
            <div className="header" onClick={handleToggle}>
                <Between>
                    <h3>{renderTitle()}</h3>
                    <Icon i="expand_more" ></Icon>
                </Between>
            </div>
            {isOpen && <div className="items">

                {renderList()}

            </div>
            }
        </div>

    )
}