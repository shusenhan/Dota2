const CreateLoginAnimation = (color) => `
    @keyframes flameShake {
        0%, 100% {
            box-shadow: 0 0 5px ${color};
        }
        25% {
            box-shadow: 0 0 8px ${color};
        }
        50% {
            box-shadow: 0 0 10px ${color};
        }
        75% {
            box-shadow: 0 0 8px ${color};
        }
    }
`;

export default CreateLoginAnimation;