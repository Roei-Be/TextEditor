import ReactMarkdown from 'react-markdown';

const Output = ({value}) => {

    return(
        <>
            <p><ReactMarkdown>{value}</ReactMarkdown></p>
        </>
    )
}

export default Output