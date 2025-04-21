


// type PropsType={
//   label: string,
//
// }

import Autocomplete from "@mui/material/Autocomplete";


const options = ['Option 1', 'Option 2'];


const Selector = () => {
    return (
        <div>
            <Autocomplete
                id="custom-input-demo"
                options={options}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input style={{ width: 200 }} type="text" {...params.inputProps} />
                    </div>
                )}
            />

        </div>
    );
};

export default Selector;