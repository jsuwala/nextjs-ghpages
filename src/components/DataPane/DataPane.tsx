import { fetchCatalog, fetchCollection, fetchItems } from '@services/stac';
import React, { useState, useEffect } from 'react';
import { Catalog, STACLink, Collection } from '@stac/StacObjects';
import { Card, CardBody, Switch} from "@nextui-org/react";

// Fetch the catalog and set it in the state
const _fetchCatalog = async (): Promise<Catalog> => {
    const catalogData = await fetchCatalog();
    return catalogData;
};

// Fetch the collection and set it in the state
const _fetchCollection = async (collectionLink: string): Promise<Collection> => {
    const collectionData = await fetchCollection(collectionLink);
    return collectionData;
};

const DataPane = () => {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [catalog, setCatalog] = useState<Catalog>(); // Update type annotation for catalog
    const [selectedCollections, setSelectedCollections] = useState<Collection[]>([]); // Track selected collections
    const [queryResult, setQueryResult] = useState<{ links: STACLink[] }[]>([]); // Update type annotation for queryResult

    const [isSelected, setIsSelected] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await _fetchCatalog();
            setCatalog(data);
        };

        fetchData();
    }, []); // Run once on component mount

    // Iterate over the catalog and pull out all the "child" links and titles
    const getChildLinksAndTitles = (catalog: Catalog): { link: string; title: string }[] => {
        const childLinksAndTitles: { link: string; title: string }[] = [];

        const traverseCatalog = (links: STACLink[]) => {
            links.forEach((link: STACLink) => {
                if (link.rel === 'child') {
                    childLinksAndTitles.push({ link: link.href, title: link.title || link.href.split('/').slice(-2, -1)[0] });
                }
            }
        );};

        if (catalog.links) {
            traverseCatalog(catalog.links);
        }
        return childLinksAndTitles;
    };

    const handleCollectionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const collectionLink = event.target.value;
        const collection: Collection = await _fetchCollection(collectionLink); // Call the fetchCollection function with the selected collection link
        selectedCollections.push(collection); // Add the selected collection to the list of selected collections
    };

    const getItems = async (collections: Collection[], startDateTime: string, endDateTime: string): Promise<{ collection_id: string; num_items: number; }> => {
        let num_items = { collection_id: '', num_items: 0 };
        for (const collection of collections) {
            setSelectedCollections(prevCollections => [...prevCollections, collection]); // Use setSelectedCollections to add collections to selectedCollections
            if (collection.links) {
                let items: STACLink[] = await fetchItems(collection, startDateTime, endDateTime);
                setQueryResult(prevResult => [...prevResult, { links: items }]); // Use setQueryResult to add items to queryResult
            }
        }
        return num_items;
    };

    const handleStartDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateTime(event.target.value);
    };

    const handleEndDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDateTime(event.target.value);
    };

    return (
        <Card>
            <CardBody>
                <Card>
                    <CardBody>
                        
                        <div>
                            <label htmlFor="startDateTime">Start Date:</label>
                            <input className='date-box' type="date" id="startDateTime" value={startDateTime} onChange={handleStartDateTimeChange} />
                        </div>
                        <div>
                            <label htmlFor="endDateTime">End Date:</label>
                            <input className='date-box' type="date" id="endDateTime" value={endDateTime} onChange={handleEndDateTimeChange} />
                        </div>
                    </CardBody>
                </Card>
                {/* Display the catalog and its contents */}
                {/* <div>
                    <pre>{JSON.stringify(catalog, null, 2)}</pre>
                </div> */}
                {/* Iterate over the catalog and display the "child" links and titles */}
                <Card>
                    <CardBody>
                        Collections:
                        {catalog && getChildLinksAndTitles(catalog).map((childLinkAndTitle, index) => (
                            <div key={index} className='input-container'>
                                <Switch defaultSelected={false} isSelected={isSelected} onValueChange={setIsSelected} onChange={handleCollectionChange} value={childLinkAndTitle.link}>
                                    {childLinkAndTitle.title}
                                </Switch>
                            </div>
                        ))}
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                    <div>
                        <button className='button' onClick={() => getItems(selectedCollections, startDateTime, endDateTime)}>Query Data</button>
                    </div>
                    </CardBody>
                    <CardBody>
                        {queryResult.length > 0 && (
                            <div>
                            Query Result Length: {queryResult[0].links.length}
                                <CardBody className='item-list'>
                                    {queryResult[0].links.map((item, index) => (
                                        <Switch key={index} defaultSelected={false} id={`product${index}`} name="STACItem" >
                                            {item.title}
                                        </Switch>
                                    ))}
                                </CardBody>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    );
};

export default DataPane;
                