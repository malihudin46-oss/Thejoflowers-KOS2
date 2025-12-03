# Backend Structure Document for Thejoflowers-KOS2

This document describes the backend architecture, database management, API design, hosting, infrastructure, security, and maintenance strategies for the Thejoflowers-KOS2 project. It’s written in everyday language so that anyone can follow along.

## 1. Backend Architecture

**Overall Design**
- We use a PHP-based backend following the Model-View-Controller (MVC) pattern.  
- Composer manages dependencies, so all libraries and utilities are loaded automatically.  
- Controllers handle incoming requests, call Models to fetch or update data, and return JSON responses to the frontend.  
- Views are minimal since most rendering happens client-side with ExtJS; they serve static HTML shells and include JavaScript/CSS assets.

**Frameworks and Patterns**
- A lightweight PHP framework (such as Laravel or a custom MVC setup) organizes the code into clear folders: `Controllers`, `Models`, `Routes`, and `Middleware`.  
- Autoloading via Composer means we never manually `require` files.  
- Routing is explicit: each URL path is mapped to a controller method.  
- Business logic lives in service classes when it grows beyond simple database queries.

**Scalability, Maintainability, Performance**
- Stateless controllers mean we can add more web servers behind a load balancer as traffic grows.  
- Separation of concerns (controllers vs. models vs. services) makes it easy to update or extend features without touching unrelated code.  
- Caching frequently used data (e.g., configuration, pivot‐grid results) with Redis reduces database load.  
- Composer’s versioning keeps third-party libraries up to date with minimal friction.

## 2. Database Management

**Technology Choices**
- Relational database (MySQL or MariaDB) for structured data.  
- Redis for in-memory caching of session data, configuration, and query results.  
- Optionally, a separate PostgreSQL instance could be used if advanced analytical queries are needed.

**Data Storage and Access**
- Models map to database tables and use an Object-Relational Mapping (ORM) layer for safety and convenience.  
- CRUD operations are written in high-level ORM methods (e.g., `User::find($id)`) rather than raw SQL, improving readability and reducing errors.  
- Transactions ensure data integrity when multiple tables are updated together (for example, creating a new content item and its audit log entry).  
- Periodic database backups are automated via scheduled jobs.

**Data Management Practices**
- Migrations track schema changes in code, allowing easy setup on new servers and version control of database structure.  
- Seeders populate lookup tables (e.g., languages, roles) for consistent environments.  
- Indexes on foreign keys, date fields, and columns used in pivot operations improve query speed.  

## 3. Database Schema

Below is a human-readable outline of the main tables. You can run the SQL shown to create them in MySQL or MariaDB.

#### users

- **id**: primary key, auto-increment  
- **name**: text  
- **email**: text, unique  
- **password_hash**: text  
- **created_at**, **updated_at**: timestamps

#### roles

- **id**: primary key, auto-increment  
- **name**: text (e.g., `admin`, `editor`, `viewer`)

#### user_roles

- **user_id**: foreign key → users.id  
- **role_id**: foreign key → roles.id

#### content_items

- **id**: primary key, auto-increment  
- **title**: text  
- **body**: long text  
- **author_id**: foreign key → users.id  
- **created_at**, **updated_at**: timestamps

#### records (for pivot grid data)

- **id**: primary key, auto-increment  
- **category**: text  
- **region**: text  
- **metric**: text  
- **value**: decimal  
- **recorded_at**: date

#### translations (i18n)

- **id**: primary key, auto-increment  
- **locale**: text (e.g., `en_US`, `fr_FR`)  
- **key**: text (message identifier)  
- **value**: text (translated string)

### SQL to Create Tables (MySQL)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE content_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  region VARCHAR(100),
  metric VARCHAR(100),
  value DECIMAL(18,4),
  recorded_at DATE
);

CREATE TABLE translations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  locale VARCHAR(10) NOT NULL,
  `key` VARCHAR(200) NOT NULL,
  `value` TEXT NOT NULL
);
```  

## 4. API Design and Endpoints

**RESTful Approach**
- We use JSON over HTTPS. Each resource (users, content, records, translations) has its own endpoint.  
- Standard HTTP verbs indicate action:  
  - `GET /api/content` — list items  
  - `POST /api/content` — create item  
  - `GET /api/content/{id}` — retrieve one  
  - `PUT /api/content/{id}` — update item  
  - `DELETE /api/content/{id}` — remove item

**Key Endpoints**
- **Authentication**  
  - `POST /api/auth/login` — accepts email/password, returns a JSON Web Token (JWT).  
  - `POST /api/auth/logout` — invalidates the token.  
- **User Management**  
  - `GET /api/users` — list users (admin only).  
  - `GET /api/users/{id}` — get user profile.  
  - `PUT /api/users/{id}` — update user.  
- **Content**  
  - CRUD operations under `/api/content`.  
- **Records for Pivot Grid**  
  - `GET /api/records?start=2023-01-01&end=2023-12-31` — returns time-filtered data.  
- **Translations**  
  - `GET /api/translations/{locale}` — returns key/value pairs for a locale.  

**Data Flow**
1. Frontend sends an AJAX request (via Ext.Ajax) with JWT in the `Authorization` header.  
2. Backend middleware checks the token, loads the user context.  
3. Controller fetches data via models, applies filters or business rules.  
4. Result is returned as JSON and bound to ExtJS data stores.

## 5. Hosting Solutions

**Environment**
- Cloud deployment on AWS for reliability and pay-as-you-go scaling.  
- Two application servers behind an Elastic Load Balancer (ELB).  
- Amazon RDS (MySQL) for the relational database.  
- ElastiCache (Redis) for caching and session storage.  
- S3 + CloudFront for serving static assets (CSS, JS, images).

**Benefits**
- **Reliability:** Multiple Availability Zones for high uptime.  
- **Scalability:** Auto Scaling Group adjusts server count to traffic.  
- **Cost-Effectiveness:** Pay only for what you use; spot instances for non-critical jobs.  
- **Global Reach:** CloudFront caches assets close to users worldwide.

## 6. Infrastructure Components

**Load Balancer**  
- Distributes incoming HTTP/S traffic across app servers.  
- Performs health checks and routes around any unhealthy instances.

**Caching Mechanisms**  
- Redis stores session data, configuration, and heavy queries (e.g., pivot data).  
- Application-level caching (e.g., tagging cache entries) invalidates related data automatically.

**CDN (Content Delivery Network)**  
- CloudFront caches static files — CSS, JavaScript bundles, images — at edge locations.  
- Reduces latency for users and offloads traffic from origin servers.

**Background Workers**  
- A small cluster of EC2 instances running queue listeners for tasks like sending emails, generating reports, or exporting data.  
- Uses Amazon SQS or Redis queues for job management.

## 7. Security Measures

**Authentication & Authorization**  
- JWT tokens secure API endpoints.  
- Role-based checks in middleware ensure users only access allowed resources.

**Data Encryption**  
- HTTPS (TLS 1.2+) everywhere.  
- RDS data-at-rest encryption for the database.  
- Redis with in-transit and at-rest encryption.

**Other Practices**  
- Parameterized queries via ORM to prevent SQL injection.  
- Content Security Policy (CSP) headers to prevent cross-site scripting.  
- Rate limiting and IP blacklisting against brute-force attacks.  
- Regular dependency scanning (Composer audit) for known vulnerabilities.

## 8. Monitoring and Maintenance

**Monitoring Tools**  
- AWS CloudWatch collects metrics on CPU, memory, disk, network for all servers.  
- New Relic or Datadog monitors application performance, traces slow requests, and alerts on anomalies.  
- ELK stack (Elasticsearch, Logstash, Kibana) aggregates and visualizes logs.

**Maintenance Strategies**  
- Automated health checks restart unhealthy services or spin up new instances.  
- Zero-downtime deployments using blue/green or rolling update strategies.  
- Monthly dependency updates and quarterly framework upgrades.  
- Regular backups: daily snapshots of RDS and hourly exports of critical tables.

## 9. Conclusion and Overall Backend Summary

The Thejoflowers-KOS2 backend is a PHP MVC application that serves JSON to an ExtJS frontend. It uses MySQL for structured data, Redis for caching, and AWS infrastructure for scalable, reliable hosting. RESTful APIs secure data exchange, while robust security, monitoring, and maintenance practices keep the system healthy and protected. This modular, documented setup aligns with the project’s goal of a high-performance, maintainable web application that can grow with user needs.