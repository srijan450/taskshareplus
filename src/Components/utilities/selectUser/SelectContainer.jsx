import React, { useContext, useEffect, useState } from 'react'
import ContentLoader from '../modals/ContentLoader'
import UserName from './users/UserName'
import api from "../../API/api";
import { CreateTaskContext } from '../../../Context';

const SelectContainer = ({ showFriends }) => {
    const { getTaskApi } = api();

    const [show, setshow] = useState(false)
    const { user, users, setusers, friends, setfriends, sharewith, cancleButtonHandler } = useContext(CreateTaskContext);
    const [send, setsend] = useState("select")

    useEffect(() => {
        if (showFriends && (!user.trim() || !user.startsWith("_")))
            return;
        setshow(true);
        const fetchApi = async () => {
            const { error, result } = await getTaskApi(`find-user?search=${user}`)
            if (!error) {
                setusers(result);
            }
        }
        fetchApi();
        setshow(false);
        const it = setTimeout(() => fetchApi(), 500);
        return () => {
            clearTimeout(it);
        }
    }, [user]);

    useEffect(() => {
        const fetchApi = async () => {
            setshow(true);
            const { error, result } = await getTaskApi(`find-friends`)
            setfriends((prev) => {
                result.forEach(element => {
                    if (!prev.includes(element))
                        prev.push(element);
                });
                return prev.sort();
            });
        }
        fetchApi();
        setshow(false);
    }, []);

    const sendHandler = (username) => {
        if (friends.includes(username)) {
            setfriends((prev) => {
                return prev.filter((uname) => uname !== username);
            });
        } else {
            setfriends((prev) => {
                return [...prev, username];
            })
        }
    }

    return (
        <div className='' style={{ height: "310px" }}>
            <div className="mt-2 px-2 py-3 border border-danger border-2" style={{ maxHeight: "300px", overflow: "auto" }}>
                {user ? <>
                    <h5 className='text-center fw-bold'>Search Result</h5>
                    <hr className='my-0' />
                    {users && users.map((data, item) => <><UserName key={item} username={data.username} send={send} setsend={setsend} sendHandler={sendHandler} /></>)}
                    {users.length == 0 && !show ? <div>Not Found! </div> : ''}

                </> :
                    <>
                        <h5 className='text-center fw-bold'>Friends</h5>
                        <hr className='my-0' />
                        {friends && friends.map((data, item) => <>
                            <UserName key={item} username={data} send={send} setsend={setsend} sendHandler={sendHandler} />
                        </>)}
                        {friends.length === 0 && !show ? <div>no friends found</div> : ''}
                    </>}

                {show ? <ContentLoader /> : ''}
            </div>
        </div >
    )
}

export default SelectContainer