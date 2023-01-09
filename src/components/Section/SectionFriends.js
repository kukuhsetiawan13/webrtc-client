import React, { useState } from "react";
import FriendRequest from "../Modal/FriendRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SectionFriends() {
  const [isFriendRequestModalVisible, setisFriendRequestModalVisible] =
    useState(false);

  const handleCloseFriendRequestModal = () =>
    setisFriendRequestModalVisible(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8 text-xl">
        <h4 className="text-white">Friends</h4>
        <FontAwesomeIcon
          onClick={() => setisFriendRequestModalVisible(true)}
          className="text-gray-400 cursor-pointer small-icons"
          icon="bell"
        />
      </div>

      <div className="flex items-center w-full rounded h-14 bg-light-gray lg:h-18">
        <div className="flex items-center justify-center w-1/6">
          <FontAwesomeIcon className="text-gray-400" icon="magnifying-glass" />
        </div>
        <div className="flex w-5/6">
          <input
            className="pr-4 text-white bg-transparent focus:border-none focus:outline-none"
            type="text"
            placeholder="Search friend"
          ></input>
        </div>
      </div>

      <div className="flex flex-col h-full gap-3 mt-5 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <div className="text-main-color">A</div>
            <div className="flex flex-col gap-5 pt-2 pl-2">
              <div className="flex justify-between">
                <h5 className="text-white cursor-pointer">Albert Rodarte</h5>
                <FontAwesomeIcon
                  className="text-gray-400 cursor-pointer"
                  icon="trash-can"
                />
              </div>
              <div className="flex justify-between">
                <h5 className="text-white cursor-pointer">Albert Rodarte</h5>
                <FontAwesomeIcon
                  className="text-gray-400 cursor-pointer"
                  icon="trash-can"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <div className="text-main-color">A</div>
            <div className="flex flex-col gap-5 pt-2 pl-2">
              <div className="flex justify-between">
                <h5 className="text-white cursor-pointer">Albert Rodarte</h5>
                <FontAwesomeIcon
                  className="text-gray-400 cursor-pointer"
                  icon="trash-can"
                />
              </div>
              <div className="flex justify-between">
                <h5 className="text-white cursor-pointer">Albert Rodarte</h5>
                <FontAwesomeIcon
                  className="text-gray-400 cursor-pointer"
                  icon="trash-can"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FriendRequest
        onClose={handleCloseFriendRequestModal}
        visible={isFriendRequestModalVisible}
      />
    </>
  );
}
