import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react'

//<ESQUEMA PARA O TELEFONE>
interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
export const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(#0) 0 0000-0000"
                definitions={{
                    '#': /[1-9]/,
                }
                }
                inputRef={ref}
                label='Telefone'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);
//</ESQUEMA PARA O TELEFONE>
