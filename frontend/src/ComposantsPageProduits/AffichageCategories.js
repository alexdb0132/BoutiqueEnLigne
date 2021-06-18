import React from 'react';

function AfficherCategories({categories, SelectionCategorie})
{
    if(categories !== undefined && categories.length > 0 )
    {
        return(
        <>
            <h4>Catégorie</h4>
            {categories.map((categorie) =>
            <div className="row my-2"> 
                <div className="form-check">
                    <input type="checkbox" id={categorie._id} value={categorie._id} onChange={SelectionCategorie} 
                    className="form-check-input" aria-label="checkbox categorie"/>
                    <label htmlFor={categorie._id} className="form-check-label ms-2">{categorie._id}</label>
                </div>
            </div>)}
        </>
        )
    }
    else
    {
        return(
            <>
                <p>Aucune catégorie disponible</p>
            </>
        )
    }
    
}

export default AfficherCategories;