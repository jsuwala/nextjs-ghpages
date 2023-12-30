import { fetchCatalog, fetchCollection, fetchItems, fetchItem } from '@services/stac';
import React, { useState, useEffect } from 'react';
import { Catalog, Collection, Item } from '@stac/StacObjects';
import { FaImage } from "react-icons/fa6";
import { 
    Card,
    CardBody,
    Checkbox,
    Modal,
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button
} from "@nextui-org/react";

const DataPane = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [catalog, setCatalog] = useState<Catalog>(); // Update type annotation for catalog
    const [collections, setCollections] = useState<Collection[]>([]); // Update type annotation for collections
    const [items, setItems] = useState<Item[]>([]); // Update type annotation for items
    
    const [collectionSelected, setCollectionSelected] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState<Collection[]>([]); // Track selected collections
    const [selectedItems, setSelectedItems] = useState<Item[]>([]); // Track selected items
    const [queryResult, setQueryResult] = useState<{ items: Item[] }[]>([]); // Update type annotation for queryResult
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Fetch the catalog and set it in the state
    const _fetchCatalog = async () => {
        const catalogData = await fetchCatalog();
        setCatalog(catalogData);
    };

    // Fetch the collection and set it in the state
    const _fetchCollection = async (collectionId: string, collectionLink: string) => {
        console.log('Looking for collection:', collectionId);
        const isCollectionPresent = collections.some(c => c.id === collectionId);
        console.log('isCollectionPresent:', isCollectionPresent);
        if (!isCollectionPresent) {
            console.log('Collection not present. Fetching...');
            const collection: Collection = await fetchCollection(collectionLink);
            setCollections(prevCollections => [...prevCollections, collection]); // Add the selected collection to the list of collections
        }
    };

    // Fetch the items and set them in the state
    const _fetchItems = async (collection: Collection, startDateTime: string, endDateTime: string) => {
        const items = await fetchItems(collection, startDateTime, endDateTime);
        setItems(items);
    };

    // Fetch the item and set it in the state
    const _fetchItem = async (itemLink: string): Promise<Item> => {
        const item = await fetchItem(itemLink);
        return item;
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            await _fetchCatalog();
        };
        fetchData();
    }, []); // Run once on component mount

    const populateCollections = async () => {
        if (catalog) {
            for (const link of catalog.links) {
                if (link.rel === 'child') {
                    await _fetchCollection(link.title, link.href);
                }
            }
        }
    }

    useEffect(() => {
        // Update the disabled state of the button when the relevant values change
        setIsButtonDisabled(!selectedCollections || !startDate || !endDate);
      }, [selectedCollections, startDate, endDate]);


    const handleCollectionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCollection = selectedCollections.find((collection) => collection.id === event.target.name);
        if (event.target.checked) {
            setIsSelected(true);
            if (!selectedCollection) {
                const collection = collections.find((collection) => collection.id === event.target.name);
                if (collection) {
                    selectedCollections.push(collection);
                    await _fetchItems(collection, startDate, endDate);
                }
            }
        }
        else {
            setIsSelected(false);
            if (selectedCollection) {
                // setSelectedCollections(prevSelectedCollections => prevSelectedCollections.filter((collection) => collection.id !== event.target.name));
                const index = selectedCollections.indexOf(selectedCollection);
                if (index > -1) {
                    selectedCollections.splice(index, 1);
                }
            }
        }
        console.log('Selected Collections:', selectedCollections);
    }

    const handleItemChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedItem = selectedItems.find((item) => item.id === event.target.name);
        if (event.target.checked) {
            // setIsSelected(true);
            if (!selectedItem) {
                const item = items.find((item) => item.id === event.target.name);
                if (item) {
                    selectedItems.push(item);
                }
            }
        }
        else {
            // setIsSelected(false);
            if (selectedItem) {
                // setSelectedItems(prevSelectedItems => prevSelectedItems.filter((item) => item.id !== event.target.name));
                const index = selectedItems.indexOf(selectedItem);
                if (index > -1) {
                    selectedItems.splice(index, 1);
                }
            }
        }
        console.log('Selected Items:', selectedItems);
    }

    const handleImgOnClick = () => {
        setIsModalOpen(true);
    }

    const closeModel = () => {
        setIsModalOpen(false);
    }

    return (
        useEffect(() => {
            populateCollections();
        }, [catalog]),
        <Card className='datapane'>
            <CardBody>
                <Card>
                    <CardBody>
                        <div>
                            <label htmlFor="startDateTime">Start Date:</label>
                            <input className='date-box' type="date" id="startDateTime" value={startDate} onChange={handleStartDateChange} />
                        </div>
                        <div>
                            <label htmlFor="endDateTime">End Date:</label>
                            <input className='date-box' type="date" id="endDateTime" value={endDate} onChange={handleEndDateChange} />
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        Collections:
                        {collections && (
                            collections.map((collection) =>
                                <Checkbox key={collection.id} name={collection.id} defaultSelected={false} onChange={handleCollectionChange}>
                                    {collection.id}
                                </Checkbox>
                                )
                        )}
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className='item-list'>
                        Items:
                        {items && (
                            items.map((item) =>
                                <Checkbox key={item.id} name={item.id} defaultSelected={false} onChange={handleItemChange}>
                                    {item.id}
                                </Checkbox>
                                )
                            )
                        }
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    );
};

export default DataPane;
                


// import React, { useState } from 'react';

// const DataPane: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleIconClick = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <div>
//             {/* Render the clickable image icon */}
//             <img src="icon.png" alt="Icon" onClick={handleIconClick} />

//             {/* Render the modal */}
//             {isModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <img src="image.png" alt="Image" />
//                         <button onClick={closeModal}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };