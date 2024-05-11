import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    location: 'All Locations',
    paymentType: 'All Payment Types',
  });

  useEffect(() => {
    // Fetch tasks from API
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.category === 'All Categories' || task.category === filters.category) &&
      (filters.location === 'All Locations' || task.location === filters.location) &&
      (filters.paymentType === 'All Payment Types' || task.paymentType === filters.paymentType)
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks</title>
        <link rel="stylesheet" href="/styles/Home.module.css" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>Logo</a>
        </Link>
        <input type="text" placeholder="Search" className={styles.searchInput} />
      </header>

      <main className={styles.main}>
        <div className={styles.filters}>
          <label>Category:</label>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="All Categories">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>

          <label>Location:</label>
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="All Locations">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>

          <label>Payment Type:</label>
          <select name="paymentType" value={filters.paymentType} onChange={handleFilterChange}>
            <option value="All Payment Types">All Payment Types</option>
            <option value="Hourly">Hourly</option>
            <option value="Fixed">Fixed</option>
          </select>

          <button onClick={() => applyFilters()}>Apply Filters</button>
        </div>

        <div className={styles.tasksList}>
          {filteredTasks.map((task) => (
            <Link href={`/tasks/${task.id}`}>
              <a className={styles.taskItem}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tasks;