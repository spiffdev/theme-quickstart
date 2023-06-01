import * as React from "react";
export const Tick: React.FC<{ width?: string; height?: string; filter?: string }> = ({
    width = "59",
    height = "59",
    filter,
}) => {
    return (
        <svg width={width} height={height} viewBox="4 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter={filter}>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27 46C39.7026 46 50 35.7026 50 23C50 10.2975 39.7026 0 27 0C14.2975 0 4 10.2975 4 23C4 35.7026 14.2975 46 27 46ZM37.6579 19.2829C38.7807 18.1602 38.7807 16.3398 37.6579 15.2171C36.5352 14.0943 34.7148 14.0943 33.5921 15.2171L24.125 24.6841L20.4079 20.9671C19.2852 19.8443 17.4648 19.8443 16.3421 20.9671C15.2193 22.0898 15.2193 23.9102 16.3421 25.0329L22.0921 30.7829C23.2148 31.9057 25.0352 31.9057 26.1579 30.7829L37.6579 19.2829Z"
                    fill="#8AE47B"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_200_165"
                    x="0"
                    y="0"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_200_165" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_200_165" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
