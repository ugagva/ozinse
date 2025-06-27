import {useState} from "react";


interface SwitcherSectionProps {
    sections?: string[],
    onActive?: (value: ( string)) => void
}

const SwitcherSection = ({sections=[], onActive}: SwitcherSectionProps) => {

        const [activeSection, setActiveSection] = useState( sections[0]  || "");


    const sectionChange = (section: string) => {
        setActiveSection(section)
        onActive?.(section)  //  вызов, если onActive передан
    }
    return (
        <div>
            {sections.map((section) => (
                <button
                    key={section}
                    className={activeSection === section ? 'active' : " "}
                    onClick={() => {sectionChange(section)
                    }}
                >

                </button>
            ))}
        </div>
    );
};

export default SwitcherSection;