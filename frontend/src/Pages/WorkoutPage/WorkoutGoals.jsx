import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import WorkoutGoalCreateModal from "../../Components/Workout/WorkoutGoalCreateModal";
import { FaDeleteLeft } from "react-icons/fa6";

const WorkoutGoals = () => {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const [selectedType, setSelectedType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoalsByType(selectedType);
  }, [selectedType, startDate, endDate]);

  const fetchGoalsByType = async (type) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8080/api/workout-goals/${userId}/${type}`
      );

      setGoals(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching goals:`, error);
      // You can add code here to provide feedback to the user about the error
    }
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleClick = () => {
    onCreateOpen();
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-start space-x-20">
        <div className="ml-8 flex justify-between items-center space-x-60">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl m-4 font-semibold">My Goals</h1>
            <BsPlusCircleFill
              className="text-2xl text-blue-400"
              onClick={handleClick}
            />
          </div>
          <div className=" items-center">
            <Select value={selectedType} onChange={handleChangeType}>
              <option value="daily">Daily Goals</option>
              <option value="weekly">Weekly Goals</option>
              <option value="monthly">Monthly Goals</option>
            </Select>
          </div>
          <div className="flex items-center">
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            {selectedType !== "daily" && (
              <Input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="w-[90%]">
          <Card>
            <CardHeader>
              <Flex justify="space-between">
                <Heading size="md">
                  {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
                  Goals
                </Heading>
                <BsThreeDotsVertical />
              </Flex>
            </CardHeader>
            <CardBody>
              {goals.map((goal, goalIndex) => {
                const goalStartDate = new Date(goal.startDate);
                const selectedDate = startDate ? new Date(startDate) : null;

                if (
                  (selectedType === "daily" &&
                    selectedDate &&
                    goalStartDate.getDate() === selectedDate.getDate() &&
                    goalStartDate.getMonth() === selectedDate.getMonth() &&
                    goalStartDate.getFullYear() ===
                      selectedDate.getFullYear()) ||
                  (selectedType !== "daily" &&
                    (!startDate || goalStartDate >= new Date(startDate)) &&
                    (!endDate ||
                      !goal.endDate ||
                      new Date(goal.endDate) <= new Date(endDate)))
                ) {
                  return (
                    <Card key={goalIndex} mb={4}>
                      <CardBody>
                        <FaDeleteLeft className="text-red-500 text-4xl float-end cursor-pointer" />
                        <div className="flex">
                          <div className="mr-4">
                            <img
                              src="https://images.healthshots.com/healthshots/en/uploads/2022/03/20121414/fitness-woman-1600x900.jpg"
                              alt=""
                              className="w-20 h-20"
                            />
                          </div>
                          <Table size="" variant="">
                            <Thead>
                              <Tr>
                                <Th width="25%">Name</Th>
                                <Th width="25%">Description</Th>
                                <Th width="25%">Target</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {goal.activities.map(
                                (activity, activityIndex) => (
                                  <Tr key={activityIndex}>
                                    <Td width="25%">{activity.name}</Td>
                                    <Td width="25%">{activity.sets}</Td>
                                    <Td width="25%">
                                      {activity.target}{" "}
                                      <span>{activity.unit}</span>
                                    </Td>
                                  </Tr>
                                )
                              )}
                            </Tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  );
                } else {
                  return null;
                }
              })}
            </CardBody>
          </Card>
        </div>
      </div>
      <WorkoutGoalCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </div>
  );
};

export default WorkoutGoals;
