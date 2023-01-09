import React, {useEffect, useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../../pictures/avatar-1.3921191a8acf79d3e907.jpg'
import VideoChat from "../Modal/VideoChat";
import Peer from "simple-peer";
import io from "socket.io-client";
import { URL_SERVER } from '../../baseUrl';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';


export default function ChatRoomHeader() {

  const { currentSocket } = useSelector((state) => state.socketReducer);

  // console.log(currentSocket, "header")

  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const handleCloseVideoModal = () => setIsVideoModalVisible(false);

  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const [peerCall, setpeerCall] = useState();
  const [peerAccept, setpeerAccept] = useState();

  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();

  let peerTest

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      return stream
    }).then(stream => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      setpeerCall(new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      }))

      // peerTest = new Peer({
      //   initiator: true,
      //   trickle: false,
      //   stream: stream,
      // })
      // console.log(peerTest)
    })
   
  }, []);

  useEffect(() => {
    if(Object.keys(currentSocket).length > 0) {
      console.log('masuk use effect chatroom header')
      currentSocket.on("yourID", (id) => {
        console.log(id)
        setYourID(id);
      })
      currentSocket.on("allUsers", (users) => {
        console.log(users)
        setUsers(users);
      })
      
  
      currentSocket.on("hey", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      })
  
      currentSocket.on("user left", () => {
        setReceivingCall(false);
        setCaller("");
        setCallAccepted(false)
        setUsers({})
        currentSocket.off("callAccepted")
        peerCall.destroy()
        // peerRef.current.destroy()
      })
    }
  }, [currentSocket])

  let key;
  useEffect(() => {
    if(yourID === Object.keys(users)[1] || yourID === Object.keys(users)[1]) {
      key = Object.keys(users)[3]
    } else {
      key = Object.keys(users)[1]
    }
    console.log(yourID, key)
  }, [users])

  // useEffect(() => {
  //   if(stream) {
  //     setpeerCall(new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream: stream,
  //     }))
  //   }
  // }, [stream])

 

  function callPeer(id) {
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: stream,
    // });
    console.log(key, "id yang mau di call")
    console.log(peerCall, "peer call waktu nge call orang lain")

    peerCall.on("signal", data => {
      console.log('peer dapet signal')
      if(Object.keys(currentSocket).length > 0) {
        console.log(key, data, yourID)
        currentSocket.emit("callUser", { userToCall: key, signalData: data, from: yourID })
      }
    })

    peerCall.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    if(Object.keys(currentSocket).length > 0) {
      currentSocket.on("callAccepted", signal => {
        setCallAccepted(true);
        peerCall.signal(signal);
      })
    }

    // peerRef.current = peer

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      if(Object.keys(currentSocket).length > 0) {
        currentSocket.emit("acceptCall", { signal: data, to: caller })
      }
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    peerRef.current = peer
  }

  // let UserVideo = <video playsInline className='h-48 w-48' muted ref={userVideo} autoPlay />


  // let PartnerVideo;
  // if (callAccepted) {
  //   console.log('parnter video muncul')
  //   PartnerVideo = (
  //     <video playsInline className='h-48 w-48' ref={partnerVideo} autoPlay />
  //   );
  // }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div className='text-white'>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-between w-full p-5 h-1/6 max-h-16'>
        
        <div>
         {/* {UserVideo} */}
        </div>
        <div>
        
        {/* {PartnerVideo} */}
        </div>
        <div className='flex items-center justify-between w-1/3 gap-3 lg:w-1/5 xl:w-1/6 2xl:max-w-fit 2xl:gap-4'>
            <FontAwesomeIcon className='text-gray-400 cursor-pointer small-icons' icon='magnifying-glass'/>
            <FontAwesomeIcon onClick={() => callPeer(key)} className='text-gray-400 cursor-pointer small-icons' icon='video'/>
            <FontAwesomeIcon onClick={() => setIsVideoModalVisible(true)} className='text-gray-400 cursor-pointer small-icons' icon='trash-can'/>
            {incomingCall}
        </div>

        <VideoChat
          onClose={handleCloseVideoModal}
          visible={callAccepted}
          userVideo = {userVideo}
          partnerVideo = {partnerVideo}
        />
    </div>
  )
}
