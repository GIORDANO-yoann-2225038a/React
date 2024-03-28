import React, { Component } from 'react';

function MyButton () {
    return (
        <div>
            <label>age : </label>
            <input type="{props.name}" />
        </div>
    );
}

export function Mdp () {
    return (
        <div>
            <label>mdp : </label>
            <input type="{props.name}" />
        </div>
    );
}

export function Annuler(props) {
    const handleClick = (action) => {
        alert(action);
    };

    return (
        <>
        <div>
            <button onClick={() => handleClick(props.texteAnnuler)}>Annuler</button>
            <button onClick={() => handleClick(props.texteValider)}>Valider</button>
        </div>
        </>
    );
}


export default MyButton;