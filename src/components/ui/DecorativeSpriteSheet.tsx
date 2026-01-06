/**
 * SVG Sprite for Decorative Elements
 * All decorative icons in one file - only 1 HTTP request!
 * 
 * Usage:
 * <svg className="w-16 h-16"><use href="#star-yellow" /></svg>
 */

const DecorativeSpriteSheet = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'none' }}
        aria-hidden="true"
    >
        {/* Star - Yellow */}
        <symbol id="star-yellow" viewBox="0 0 100 100">
            <path
                fill="#FCD34D"
                stroke="#1F2937"
                strokeWidth="3"
                d="M50 10 L61 38 L91 38 L67 56 L77 84 L50 66 L23 84 L33 56 L9 38 L39 38 Z"
            />
        </symbol>

        {/* Star - Blue */}
        <symbol id="star-blue" viewBox="0 0 100 100">
            <path
                fill="#60A5FA"
                stroke="#1F2937"
                strokeWidth="3"
                d="M50 10 L61 38 L91 38 L67 56 L77 84 L50 66 L23 84 L33 56 L9 38 L39 38 Z"
            />
        </symbol>

        {/* Star - Green */}
        <symbol id="star-green" viewBox="0 0 100 100">
            <path
                fill="#4ADE80"
                stroke="#1F2937"
                strokeWidth="3"
                d="M50 10 L61 38 L91 38 L67 56 L77 84 L50 66 L23 84 L33 56 L9 38 L39 38 Z"
            />
        </symbol>

        {/* Star - Red */}
        <symbol id="star-red" viewBox="0 0 100 100">
            <path
                fill="#F87171"
                stroke="#1F2937"
                strokeWidth="3"
                d="M50 10 L61 38 L91 38 L67 56 L77 84 L50 66 L23 84 L33 56 L9 38 L39 38 Z"
            />
        </symbol>

        {/* Star - Purple */}
        <symbol id="star-purple" viewBox="0 0 100 100">
            <path
                fill="#C084FC"
                stroke="#1F2937"
                strokeWidth="3"
                d="M50 10 L61 38 L91 38 L67 56 L77 84 L50 66 L23 84 L33 56 L9 38 L39 38 Z"
            />
        </symbol>

        {/* Smiley - Happy */}
        <symbol id="smiley-happy" viewBox="0 0 100 100">
            <circle fill="#FCD34D" stroke="#1F2937" strokeWidth="3" cx="50" cy="50" r="45" />
            <circle fill="#1F2937" cx="35" cy="40" r="5" />
            <circle fill="#1F2937" cx="65" cy="40" r="5" />
            <path
                fill="none"
                stroke="#1F2937"
                strokeWidth="3"
                strokeLinecap="round"
                d="M 30 60 Q 50 75 70 60"
            />
        </symbol>

        {/* Smiley - Cool */}
        <symbol id="smiley-cool" viewBox="0 0 100 100">
            <circle fill="#60A5FA" stroke="#1F2937" strokeWidth="3" cx="50" cy="50" r="45" />
            <rect fill="#1F2937" x="25" y="35" width="20" height="8" rx="2" />
            <rect fill="#1F2937" x="55" y="35" width="20" height="8" rx="2" />
            <path
                fill="none"
                stroke="#1F2937"
                strokeWidth="3"
                strokeLinecap="round"
                d="M 35 65 L 65 65"
            />
        </symbol>

        {/* Rectangle - Yellow */}
        <symbol id="rect-yellow" viewBox="0 0 100 100">
            <rect
                fill="#FCD34D"
                stroke="#1F2937"
                strokeWidth="3"
                x="10"
                y="10"
                width="80"
                height="80"
                rx="8"
            />
        </symbol>

        {/* Rectangle - Blue */}
        <symbol id="rect-blue" viewBox="0 0 100 100">
            <rect
                fill="#60A5FA"
                stroke="#1F2937"
                strokeWidth="3"
                x="10"
                y="10"
                width="80"
                height="80"
                rx="8"
            />
        </symbol>

        {/* Rectangle - Green */}
        <symbol id="rect-green" viewBox="0 0 100 100">
            <rect
                fill="#4ADE80"
                stroke="#1F2937"
                strokeWidth="3"
                x="10"
                y="10"
                width="80"
                height="80"
                rx="8"
            />
        </symbol>

        {/* Rectangle - Red */}
        <symbol id="rect-red" viewBox="0 0 100 100">
            <rect
                fill="#F87171"
                stroke="#1F2937"
                strokeWidth="3"
                x="10"
                y="10"
                width="80"
                height="80"
                rx="8"
            />
        </symbol>
    </svg>
);

export default DecorativeSpriteSheet;
