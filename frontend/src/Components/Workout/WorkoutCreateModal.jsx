import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios"; // Import axios library
import { FaRunning } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const WorkoutCreateModal = ({ onClose, isOpen }) => {
  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState(""); // State to hold the date

  const handleInputChange = (index, name, value) => {
    const list = [...activities];
    list[index][name] = value;
    setActivities(list);
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((activity, i) => i !== index));
  };

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const userId = localStorage.getItem("userId");

  const saveWorkout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/workouts/${userId}`,
        { date, activities } // Send date along with activities in the request payload
      );
      console.log("Workout created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div>
              <div className="pb-10">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl m-4 font-semibold">Create Workout</h1>
                  <hr />
                  <hr />
                  <div>
                    <Input
                      size="md"
                      label="date"
                      placeholder="Select Date"
                      type="date"
                      value={date} // Bind value to date state
                      onChange={(e) => setDate(e.target.value)} // Update date state
                    />
                  </div>
                </div>
                <div>
                  <div>
                    {activities.map((activity, index) => (
                      <>
                        <div className="flex items-center">
                          {activity.name === "Running" && (
                            <FaRunning className="text-xl" />
                          )}
                          {activity.name === "Weight Lifting" && (
                            <GiWeightLiftingUp className="text-xl" />
                          )}
                          {activity.name === "Yoga" && (
                            <GrYoga className="text-xl" />
                          )}
                          {activity.name === "Swimming" && (
                            <FaSwimmer className="text-xl" />
                          )}
                          <h2 className="ml-2 font-semibold mt-4 mb-4 items-center">
                            {activity.name}
                          </h2>
                        </div>
                        <div className="flex">
                          <div className="flex">
                            {activity.name !== "Yoga" && (
                              <>
                                <Input
                                  size="md"
                                  name="distance"
                                  placeholder="Distance"
                                  value={activity.distance || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "distance",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  size="md"
                                  name="reps"
                                  placeholder="Reps"
                                  value={activity.reps || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "reps",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  size="md"
                                  name="sets"
                                  placeholder="Sets"
                                  value={activity.sets || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "sets",
                                      e.target.value
                                    )
                                  }
                                />
                              </>
                            )}
                            <Input
                              type="time"
                              size="md"
                              name="startTime"
                              placeholder="Start Time"
                              value={activity.startTime || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              type="time"
                              size="md"
                              name="endTime"
                              placeholder="End Time"
                              value={activity.endTime || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <MdOutlineRemoveCircleOutline
                            onClick={() => removeActivity(index)}
                            className="text-2xl text-red-500 cursor-pointer mt-2 ml-4"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="float-end mt-4">
                <Button onClick={() => addActivity({ name: "Running" })}>
                  Add Running
                </Button>
                <Button onClick={() => addActivity({ name: "Weight Lifting" })}>
                  Add Weight Lifting
                </Button>
                <Button onClick={() => addActivity({ name: "Yoga" })}>
                  Add Yoga
                </Button>
                <Button onClick={() => addActivity({ name: "Swimming" })}>
                  Add Swimming
                </Button>
                <Button onClick={saveWorkout}>Save</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WorkoutCreateModal;
