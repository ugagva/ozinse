import {Autocomplete, Chip, } from "@mui/material";
import TextField from "@mui/material/TextField";



type optionsPropsType = {
    options: string [],
    variants?: string,
    label?: string,
    placeholder?: string,
    size?:'medium' | 'small'
}

const Selector = (props: optionsPropsType) => {



    return (
        <div>
            <Autocomplete sx={{justifyContent: "center", alignItems: "center", minWidth: 238, maxHeight: 40,"& .MuiFilledInput-root": {

                    fontFamily: "Arial",
                    fontWeight: "bold",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "12px",

                }}}
                          multiple
                          id="tags-filled"
                          options={props.options}

                          renderValue={(value: readonly string[], getItemProps) =>
                              value.map((option: string, index: number) => {
                                  const {key, ...itemProps} = getItemProps({index});
                                  return (
                                      <Chip variant="filled" label={option} key={key} {...itemProps}
                                            />
                                  );
                              })
                          }
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="filled"
                                  label={props.label}
                                  placeholder={props.placeholder}
                                  size={props.size}
                                  fullWidth
                                  sx={{"& .MuiFilledInput-root": {

                                          fontFamily: "Arial",
                                          fontWeight: "bold",
                                          backgroundColor: "#f4f4f4",
                                          borderRadius: "12px",

                                      },}}

                              />
                          )}
            />


        </div>
    );
};

export default Selector;