import { useState } from "react";
import "../style/RichTextarea.css";

import { MathJax } from "better-react-mathjax";
import ReactMarkdown from 'react-markdown';

const RichTextarea = ({value, setValue, max_length, dark_mode}) => {
    
    max_length = 100;
    dark_mode = true;

    const [preview, setPreview] = useState(false);
    // const [LTR, setLTR] = useState(true);

    const toolbox_button = (button) => {
        switch(button) {
            case "inline_code":
                setValue(value + '\`x=1\`');
                break;
            case "code_block":
                setValue(value + `
\`\`\`
for i in range(6):
    print(i**2)
\`\`\`
`);
                break;
            case "inline_math":
                setValue(value + '$x=1$');
                break;
            case "math_block":
                setValue(value + `
\\begin{align}
& x + y = a \\tag{1} \\\\\\\\
& x \\times y = b \\tag{2} \\\\\\\\
& x^y = y \\tag{3}
\\end{align}
`);
                break;
            case "cases":
                setValue(value + `
\\begin{gather}
\\begin{cases}
\\tag{1}
b^2-4ac > 0, & \\text{2 solutions exist} \\\\\\\\
b^2-4ac = 0, & \\text{1 solution exists} \\\\\\\\
b^2-4ac < 0, & \\text{0 solutions exist}
\\end{cases}
\\end{gather}
`);
                break;
            case "bmatrix":
                setValue(value + `
$\\begin{bmatrix}
a & b \\\\\\\\
c & d
\\end{bmatrix}$\n
`);
                break;
            case "pmatrix":
                setValue(value + `
$\\begin{pmatrix}
a & b \\\\\\\\
c & d
\\end{pmatrix}$\n
`);
                break;
            default:
        }
    }
    
    return (
        <div className={`rich_textarea_wrapper ${dark_mode ? "rich_textarea_wrapper_wrapper_dark" : ""}`}>
            <div className="rich_textarea_toolbar_wrapper">
                <span className="rich_textarea_button" onClick={() => setPreview(!preview)}>
                    {!preview && <span className="material-symbols-outlined">visibility_off</span>}
                    {preview && <span className="material-symbols-outlined">visibility</span>}
                </span>
                |
                <span onClick={() => toolbox_button("bold")} className="rich_textarea_button"><span className="material-symbols-outlined">format_bold</span></span>
                <span onClick={() => toolbox_button("font_size")} className="rich_textarea_button"><span className="material-symbols-outlined">format_size</span></span>
                |
                <span onClick={() => toolbox_button("align_left")} className="rich_textarea_button"><span className="material-symbols-outlined">format_align_left</span></span>
                <span onClick={() => toolbox_button("align_center")} className="rich_textarea_button"><span className="material-symbols-outlined">format_align_center</span></span>
                <span onClick={() => toolbox_button("align_right")} className="rich_textarea_button"><span className="material-symbols-outlined">format_align_right</span></span>
                |
                <span onClick={() => toolbox_button("bullet_list")} className="rich_textarea_button"><span className="material-symbols-outlined">format_list_bulleted</span></span>
                |
                <span onClick={() => toolbox_button("inline_code")} className="rich_textarea_button" title="Inline code"><span className="material-symbols-outlined">code</span></span>
                <span onClick={() => toolbox_button("code_block")} className="rich_textarea_button" title="Code block"><span className="material-symbols-outlined">code_blocks</span></span>
                |
                <span onClick={() => toolbox_button("power")} title="power" className="rich_textarea_button"><MathJax>{"$x^a$"}</MathJax></span>
                <span onClick={() => toolbox_button("root")} title="root" className="rich_textarea_button"><MathJax>{"$\\sqrt[a]{x}$"}</MathJax></span>
                <span onClick={() => toolbox_button("fraction")} title="fraction" className="rich_textarea_button"><MathJax>{"$\\frac{a}{b}$"}</MathJax></span>
                <span onClick={() => toolbox_button("sum")} title="sum" className="rich_textarea_button"><MathJax>{"$\\sum$"}</MathJax></span>
                <span onClick={() => toolbox_button("integral")} title="integral" className="rich_textarea_button"><MathJax>{"$\\int$"}</MathJax></span>
                |
                <span onClick={() => toolbox_button("inline_math")} className="rich_textarea_button" title="Mathematical expression (inline)"><span className="material-symbols-outlined">function</span></span>
                <span onClick={() => toolbox_button("math_block")} className="rich_textarea_button" title="System of equations"><span className="material-symbols-outlined">equal</span></span>
                <span onClick={() => toolbox_button("cases")} className="rich_textarea_button" title="Cases"><span className="material-symbols-outlined">data_object</span></span>
                <span onClick={() => toolbox_button("bmatrix")} title="bmatrix" className="rich_textarea_button rich_textarea_button_math"><MathJax>{"$\\begin{bmatrix}a & b \\\\\\ c & d \\end{bmatrix}$"}</MathJax></span>
                <span onClick={() => toolbox_button("pmatrix")} title="pmatrix" className="rich_textarea_button rich_textarea_button_math"><MathJax>{"$\\begin{pmatrix}a & b \\\\\\ c & d \\end{pmatrix}$"}</MathJax></span>
            </div>
            <div className="rich_textarea_main_wrapper">
                <textarea id="rich_textarea_input" className={`textarea ${dark_mode ? "textarea_dark" : ""}`} onChange = { (e) => e.target.value.length <= max_length ? setValue(e.target.value) : {} } value={value}></textarea>
            </div>
            <div style={value.length >= max_length ? {"color": "#A93226"} : {}}>{value.length}/{max_length}</div>

            {preview &&
            <div className="rich_textarea_preview_wrapper">
                <MathJax key={value}><ReactMarkdown linkTarget="_blank">{value}</ReactMarkdown></MathJax>
            </div>
            }
        </div>
    )
}

export default RichTextarea;