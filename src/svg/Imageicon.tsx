import React from "react";

const Imageicon: React.FunctionComponent<{ className: string; fill: string }> = (props) => (
    <svg
        className={props.className}
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.6665 18.6666L8.16303 12.1701C9.26952 11.0636 11.0635 11.0636 12.17 12.1701L18.6665 18.6666M15.8332 15.8333L18.0797 13.5868C19.1862 12.4803 20.9802 12.4803 22.0866 13.5868L24.3332 15.8333M15.8332 7.33329H15.8473M4.49984 24.3333H21.4998C23.0646 24.3333 24.3332 23.0648 24.3332 21.5V4.49996C24.3332 2.93515 23.0646 1.66663 21.4998 1.66663H4.49984C2.93503 1.66663 1.6665 2.93515 1.6665 4.49996V21.5C1.6665 23.0648 2.93503 24.3333 4.49984 24.3333Z"
            stroke={props.fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default Imageicon;
