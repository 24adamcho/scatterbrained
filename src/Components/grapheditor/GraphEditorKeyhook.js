import { useEffect, useRef } from 'react';

function contains(activeElement, HTMLCollection) {
    for (var i = 0; i < HTMLCollection.length; i++)
        if (activeElement == HTMLCollection.item(i))
            return true;
    return false;
}
export function useKey(key, cb) {
    const callback = useRef(cb);

    key = {
        ...key,
        ctrlKey: (key.ctrlKey !== undefined) ? key.ctrlKey : false,
        altKey: (key.altKey !== undefined) ? key.altKey : false,
        shiftKey: (key.shiftKey !== undefined) ? key.shiftKey : false,
    };

    useEffect(() => {
        callback.current = cb;
    });

    const keyCompare = (event) => {
        return (
            event.key === key.key &&
            event.ctrlKey === key.ctrlKey &&
            event.altKey === key.altKey &&
            event.shiftKey === key.shiftKey
        );
    };

    useEffect(() => {
        function handle(event) {
            const currentElement = document.activeElement;


            if (currentElement === document.body
                || contains(currentElement, document.getElementsByClassName('react-flow__node'))
                || contains(currentElement, document.getElementsByClassName('react-flow__edge'))
                || contains(currentElement, document.getElementsByClassName('addNoteButton'))
                || contains(currentElement, document.getElementsByClassName('react-flow__nodesselection-rect'))) {
                if (keyCompare(event) || event.code == key.key) {
                    callback.current(event);
                }
            }
            //duplicate if because it really really doesn't want to be in the previous if statement for some magic reason
            if(contains(currentElement, document.getElementsByClassName('btn'))){
                if (keyCompare(event) || event.code == key.key){
                    callback.current(event);
                }
            }
        }

        document.body.addEventListener('keydown', handle);
        return () => document.body.removeEventListener("keydown", handle);
    }, [key]);
}
