import React, { useState, useEffect } from 'react';
import './Categories.css';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const Categories = (props) => {
    let type = props.location.catProp.type;
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        db.collection("photos")
        .orderBy("timestamp", "desc")
        .where("category", "==", type)
        .onSnapshot((snapshot) => {
            setPhotos(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        );
      });
    }, [type])
    return (
        <div className="row" style={{marginTop: "20px", textAlign: "center"}}>
            {photos.map(({ id, data }) => (
                <div key={id} className="col-auto" style={{padding: "5px"}}>
                    <Link to={{
                        pathname: "/view",
                        viewProps: {
                            data: data,
                            id: id
                        }
                    }}>
                        <img
                        src={data.imageUrl}
                        caption={data.caption}
                        alt={data.caption}
                        width="350px"
                        />
                    </Link>
                </div>
          ))}
        </div>
    )
}

export default Categories;
