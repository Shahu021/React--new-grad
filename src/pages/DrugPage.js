import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getDrugDetails , getNDCs } from '../api';

function DrugPage() {
    const { drugName } = useParams();
    const [details, setDetails] = useState(null);
    const [ndcs, setNdcs ] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const { data } = await getDrugDetails(drugName);
            const rxcui = data.idGroup.rxnormId[0];
            setDetails({name: drugName,rxcui});

            const ndcResponse = await getNDCs(rxcui);
            setNdcs(ndcResponse.data.ndcGroup.ndcList.ndc);
        }catch (err) {
            console.error ('Failed to fetch drug details', err);
        }        
     };
     fetchDetails();
    }, [drugName]);
    if(!details) return <div>Loading...</div>;

    return (
        <div>
            <h1> {details.name} </h1>
            <p>RSCUI : {details.rxcui} </p>
            <h2> NDCs:</h2>

         <ul>
            {ndcs.map(ndc => (
                <li key={ndc} > {ndc}</li>
            ))}
          </ul> 
         </div>
    );
}


 export default DrugPage;
