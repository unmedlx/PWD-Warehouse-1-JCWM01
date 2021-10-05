import React from 'react'

const ProfileData = () => {
    return (
        <>
            <p><strong>Biodata Diri</strong></p>
            <div className="profile-main-data">
                <div className="input-container">
                    <input type="text" className="input-field" placeholder="Username" value={"nadhif_rafifaiz"} disabled />
                </div>
                <div className="input-container">
                    <input type="text" className="input-field" placeholder="Date of Birth" />
                </div>
                <div className="input-container">
                    <input type="text" className="input-field" placeholder="Email" />
                </div>
                <div className="input-container">
                    <select type="text" className="input-field" placeholder="Gender">
                        <option value="1">Male</option>
                        <option value="2" selected>Female</option>
                        <option value="3">Rather not to mention</option>
                    </select>
                </div>
                <div className="input-container">
                    <input type="text" className="input-field" placeholder="Fullname" />
                </div>
            </div>

            <button className="btn btn-warning">Edit Data</button>
        </>
    )
}

export default ProfileData
