import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EventsContext = createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export function EventsContextProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, categoriesRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/events"),
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/users"),
        ]);

        setEvents(eventsRes.data);
        setCategories(categoriesRes.data);
        setUsers(usersRes.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/events",
        newEvent
      );
      setEvents([...events, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/events/${id}`,
        updatedEvent
      );
      setEvents(
        events.map((event) => (event.id === id ? response.data : event))
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const value = {
    events,
    categories,
    users,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}
