import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import decode from 'jwt-decode';
import {
    Navigate,
  } from "react-router-dom";

function GAForm() {
    let location = useLocation();
    const {id:docId} = useParams();
    const token = window.localStorage.getItem("token");
    const decodedToken = decode(token);

    const [docObj, setDocObj] = useState();

    const [KB, setKB] = useState('');
    const [PA, setPA] = useState('');
    const [I, setI] = useState('');
    const [D, setD] = useState('');
    const [ET, setET] = useState('');
    const [ITW, setITW] = useState('');
    const [CS, setCS] = useState('');
    const [PR, setPR] = useState('');
    const [IESE, setIESE] = useState('');
    const [EE, setEE] = useState('');
    const [EPM, setEPM] = useState('');
    const [LL, setLL] = useState('');
    const [view, setView] = useState(false);
    // const [formInput, setFormInput] = useState({
    //     "Knowledge Base": KB,
    //     "ProblemAnalysis": PA,
    //     "Investigation": I,
    //     "Design": D,
    //     "Use of Engineering Tools": ET,
    //     "IndividualAndTeamWork": ITW,
    //     "Communication Skills": CS,
    //     "Professionalism": PR,
    //     "Impact of Engineering on Society and the Environment": IESE,
    //     "Ethics and Equity": EE,
    //     "Economics and Project Management": EPM,
    //     "Life-Long Learning": LL
    // });

    var formInput = {

        "Knowledge Base": KB,
        "ProblemAnalysis": PA,
        "Investigation": I,
        "Design": D,
        "Use of Engineering Tools": ET,
        "IndividualAndTeamWork": ITW,
        "Communication Skills": CS,
        "Professionalism": PR,
        "Impact of Engineering on Society and the Environment": IESE,
        "Ethics and Equity": EE,
        "Economics and Project Management": EPM,
        "Life-Long Learning": LL
    };

    useEffect(() => {
        console.log(docId);
        // getGA(docId);
    }, []);

    // const preLoadMaster = (ga) => {
    //     handleKBPreload(ga.KnowledgeBase)
    //     handlePAPreload(ga.ProblemAnalysis)
    //     handleIPreload(ga.Investigation)
    //     handleDPreload(ga.Design)
    //     handleETPreload(ga["Use of EngineeringTools"])
    //     handleITWPreload(ga["IndividualAndTeam Work"])
    //     handleCSPreload(ga.CommunicationSkills)
    //     handlePRPreload(ga.Professionalism)
    //     handleIESEPreload(ga["ImpactofEngineering on Society and the Environment"])
    //     handleEEPreload(ga.EthicsAndEquity)
    //     handleEPMPreload(ga.EconomicsAndProjectManagement)
    //     handleLLPreload(ga.LifeLongLearning)
    // }

    // const getGA = () => {
    //     fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/${docId}/ga-indicators`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Authorization': token
    //             }
    //         })
    //         .then(async (res) => {
    //             if (res.ok) {
    //                 let obj = await res.json();
    //                 setFormInput(obj.gaIndicator);
    //                 preLoadMaster();
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    const handleKBChange = (event) => {
        setKB(event.target.value);
        console.log(KB)
    };

    const handlePAChange = (event) => {
        setPA(event.target.value);
        console.log(PA)
    };

    const handleIChange = (event) => {
        setI(event.target.value);
    };

    const handleDChange = (event) => {
        setD(event.target.value);
    };

    const handleETChange = (event) => {
        setET(event.target.value);
    };

    const handleITWChange = (event) => {
        setITW(event.target.value);
    };

    const handleCSChange = (event) => {
        setCS(event.target.value);
    };

    const handlePRChange = (event) => {
        setPR(event.target.value);
    };

    const handleIESEChange = (event) => {
        setIESE(event.target.value);
    };

    const handleEEChange = (event) => {
        setEE(event.target.value);
    };

    const handleEPMChange = (event) => {
        setEPM(event.target.value);
    };

    const handleLLChange = (event) => {
        setLL(event.target.value);
    };

    const handleViewChange = (event) => {
        setView(true);
    }



    // const handleKBPreload = (load) => {
    //     setKB(load)
    // };

    // const handlePAPreload = (load) => {
    //     setPA(load);
    // };

    // const handleIPreload = (load) => {
    //     setI(load);
    // };

    // const handleDPreload = (load) => {
    //     setD(load);
    // };

    // const handleETPreload = (load) => {
    //     setET(load);
    // };

    // const handleITWPreload = (load) => {
    //     setITW(load);
    // };

    // const handleCSPreload = (load) => {
    //     setCS(load);
    // };

    // const handlePRPreload = (load) => {
    //     setPR(load);
    // };

    // const handleIESEPreload = (load) => {
    //     setIESE(load);
    // };

    // const handleEEPreload = (load) => {
    //     setEE(load);
    // };

    // const handleEPMPreload = (load) => {
    //     setEPM(load);
    // };

    // const handleLLPreload = (load) => {
    //     setLL(load);
    // };

    // const handleViewPreload = (event) => {
    //     setView(true);
    // }


    const { id: documentID } = useParams();

    console.log(documentID)

    let navigate = useNavigate(); 



    const save = async () => {


        var quillGA =
            [
                { "insert": `\n\nKnowledgeBase ${KB}` },
                { "insert": `\n\nProblem Analysis ${PA}` },
                { "insert": `\n\nInvestigation ${I}` },
                { "insert": `\n\nDesign ${D}` },
                { "insert": `\n\nUse of EngineeringTools ${ET}` },
                { "insert": `\n\nIndividual And Team Work ${ITW}` },
                { "insert": `\n\nCommunication Skills ${CS}` },
                { "insert": `\n\nProfessionalism ${PR}` },
                { "insert": `\n\nImpact Of Engineering on Society and the Environment ${IESE}` },
                { "insert": `\n\nEthics And Equity ${EE}` },
                { "insert": `\n\nEconomics And Project Management ${EPM}` },
                { "insert": `\n\nLife-Long Learning ${LL}` }
            ]

        

        const updateDocument = async () => {
            console.log('update');

            const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`);
            const data = await document.json();
            const opsList = data.ops || data

            console.log(opsList)

            let index = 0;
         

                for (let i = 0; i < opsList.length; i++) {
                    if (opsList[i].insert === "General Learning Objectives (CEAB Graduate Attributes)") {
                    index = i;
                    break;
                        }
                    }
            
            console.log(index)

            if (quillGA.length > 0) {
                quillGA.forEach(element => {
                    index = index + 1;
                    opsList.splice(index, 0 ,element)
                    
                });

            }

            const payload = {
                ops:opsList,
                author:decodedToken.username
            }

            const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(payload)
            })

            console.log(response)

            if (response.status != 200) {
                console.log(response.error);
            }

            console.log("success")
        }

        const updateIndicators = async () => {

            const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/ga-indicators`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formInput)
                })
        
                console.log(formInput)
        
                if(response.status != 200){
                console.log(response.error);
            }

        }

        const routeChange = async () =>{ 
            await updateDocument();
            await updateIndicators();
            let path = `/documents/${documentID}`; 
            navigate(path);
        }

        console.log("hit this")
        // updateDocument()
        // updateIndicators();
        routeChange();

        
    }

    // const handleFormInputChange = () => {
    //     setFormInput({
    //         "KnowledgeBase": KB,
    //         "ProblemAnalysis": PA,
    //         "Investigation": I,
    //         "Design": D,
    //         "Use of EngineeringTools": ET,
    //         "IndividualAndTeam Work": ITW,
    //         "CommunicationSkills": CS,
    //         "Professionalism": PR,
    //         "ImpactOfEngineering on Society and the Environment": IESE,
    //         "EthicsAndEquity": EE,
    //         "EconomicsAndProjectManagement": EPM,
    //         "LifeLongLearning": LL
    //     });
    //     console.log("this is called?")
    //     console.log(formInput)
        
    // };

    const handleSubmit = async (event) => {
        //handleFormInputChange()
        console.log('d');
        event.preventDefault();
        save();
            
    }


    return (
        <>
            <NavBar></NavBar>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
                <Link className="my-link" state={view} to="/instructor/courses/outline/rubric"><button onClick={handleViewChange} className='btn btn-secondary'>View Rubric</button></Link>
            </div>
            <div>
                <h1>GA Indicators</h1>
                <h2 data-attribute={"General Learning Objectives (CEAB Graduate Attributes)"}></h2>

                <div>
                    <h4>Knowledge Base</h4>
                    <select id='KB' defaultValue="I" value={KB} onChange={handleKBChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Problem Analysis</h4>
                    <select id='PA' value={PA} onChange={handlePAChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Investigation</h4>
                    <select id='I' value={I} onChange={handleIChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Design</h4>
                    <select id='D' value={D} onChange={handleDChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Use of Engineering Tools</h4>
                    <select id='ET' value={ET} onChange={handleETChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Individual and Team Work</h4>
                    <select id='ITW' value={ITW} onChange={handleITWChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Communication Skills</h4>
                    <select id='CS' value={CS} onChange={handleCSChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Professionalism</h4>
                    <select id='PR' value={PR} onChange={handlePRChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Impact on Society and the Environment</h4>
                    <select id='IESE' value={IESE} onChange={handleIESEChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Ethics and Equity</h4>
                    <select id='EE' value={EE} onChange={handleEEChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Economics and Project Management</h4>
                    <select id='EPM' value={EPM} onChange={handleEPMChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Life-Long Learning</h4>
                    <select id='LL' value={LL} onChange={handleLLChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                </div>

                <form onSubmit={handleSubmit}>
                     <button className='btn btn-success' type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default GAForm;
