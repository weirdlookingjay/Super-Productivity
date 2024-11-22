import { Button } from "../ui/button"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const ProviderSignBtn = ({ children, ...props }: Props) => {
    return (
        <Button {...props} variant={"secondary"} type="button">
            {children}
        </Button>
    )
}

export default ProviderSignBtn