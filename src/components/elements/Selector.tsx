import {Autocomplete, Chip,} from "@mui/material";
import TextField from "@mui/material/TextField";
import {createStyles, makeStyles} from "@mui/styles";


type optionsPropsType = {
    variants?: string,
    label?: string,
    placeholder?: string,
    size?: 'medium' | 'small',
    options: ReadonlyArray<string>,
    className?: string,

}
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            padding: '10px 4px',

            alignItems: 'center',
            borderRadius:'16px',

            width: 238,
            height:40,
            backgroundColor: '#8F92A10D',
        },
        input: {

            flex: 3,
        }

    })
)

const Selector = (props: optionsPropsType) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Autocomplete
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    width:220,
                    height: 40,
                    backgroundColor: "#8F92A10D",
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'hidden',
                        borderRadius:'10px'
                    },


                }}
                multiple
                id="tags-filled"
                options={props.options}
                fullWidth



                renderValue={(value: readonly string[], getItemProps) =>
                    value.map((option: string, index: number) => {
                        const {key, ...itemProps} = getItemProps({index});
                        return (
                            <Chip
                                variant="outlined"
                                label={option}
                                key={key}
                                {...itemProps}

                                sx={{

                                }}
                            />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField

                        {...params}
                        variant="outlined"
                        label={props.label}
                        placeholder={props.placeholder}
                        size={props.size}
                        fullWidth
                        sx={{

                        }}

                    />
                )}
            />


        </div>
    );
};

export default Selector;