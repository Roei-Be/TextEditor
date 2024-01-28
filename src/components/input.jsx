import '../style/input.css';
import { useRef } from 'react';

const Input = ({ value, setValue }) => {
  const textareaRef = useRef(null);

  const handleTextAreaChange = (event) => {
    setValue(event.target.value);
  };

  const applyMarkdown = (MD1, MD2) => {
    // Get the current cursor position
    const cursorPosition = textareaRef.current.selectionStart;

    // Insert '**' at the cursor position
    const updatedText =
      value.substring(0, cursorPosition) +
      MD1 + MD2 +
      value.substring(cursorPosition);

    // Update the state with the modified text
    setValue(updatedText);

    // Move the cursor position after the inserted '**'
    requestAnimationFrame(() => {
        // Move the cursor position between the two instances of MD
        textareaRef.current.setSelectionRange(
          cursorPosition + MD1.length,
          cursorPosition + MD1.length
        );
    
        // Bring focus back to the text area
        textareaRef.current.focus();
      });
  };

  return (
    <>
      <div className="buttons">
        <button onClick={() => applyMarkdown("**", "**")}>B</button>
        <button onClick={() => applyMarkdown("*", "*")}>/</button>
        <button onClick={() => applyMarkdown('""', '""')}>" "</button>
        <button onClick={() => applyMarkdown("'", "'")}>' '</button>
        <button onClick={() => applyMarkdown("`", "`")}>` `</button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        cols="30"
        rows="10"
        onChange={handleTextAreaChange}
      ></textarea>
    </>
  );
};

export default Input;
