import React, { Component } from 'react'


export default class CharacterSets extends Component {

state = {
    picUrl: "The11Doctors.png",
    width: "114px",
    height: "157px",
    peeps: []
};

peepsFromNames = (names) => {
    samplePeeps = {
        name : "1st",
        position: 

    };

    const peeps = names.map(peep, {
        samplePeeps[peep];
    })
};

handleChange = (e) => {
    const names = e.target.value.split(,);
    const peeps = peepsFromNames(names);
    this.setState(peeps: peeps);

};
    render() {
        const sprites = this.state.peeps.map(peep, {
            return (
                <CharacterSprite peep={peep} />
            );
        })
        return (
            <div>
                <input type="text" name="peeps" id="peeps" className="text" onChange={this.handleChange}/>
                {sprites}

            </div>
        )
    }
}
