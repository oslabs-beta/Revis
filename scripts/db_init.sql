--
-- postgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: revisdb; Type: DATABASE; Schema: -; Owner: jlrxiqce
--

\connect revisdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

-- SET default_tablespace = '';

SET default_with_oids = false;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    username text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    session text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users OWNER to jlrxiqce;


-- Table: public.serverCloud

-- DROP TABLE IF EXISTS public."serverCloud";

CREATE TABLE IF NOT EXISTS public."serverCloud"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    endpoint text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    port integer NOT NULL,
    lastcalled date NOT NULL DEFAULT CURRENT_DATE,
    previouslycalled boolean NOT NULL DEFAULT false,
    CONSTRAINT "serverCloud_pkey" PRIMARY KEY (id),
    CONSTRAINT "user_id-f_key" FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."serverCloud" OWNER to jlrxiqce;

-- Table: public.metrics

-- DROP TABLE IF EXISTS public.metrics;

CREATE TABLE IF NOT EXISTS public.metrics
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    server_id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    value text[] COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT metrics_pkey PRIMARY KEY (id),
    CONSTRAINT "server_id-f_key" FOREIGN KEY (server_id)
        REFERENCES public."serverCloud" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "user_id-f_key" FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.metrics OWNER to jlrxiqce;

-- Table: public.0d94f51fdca1782b63e4fbe02794deea

-- DROP TABLE IF EXISTS public."0d94f51fdca1782b63e4fbe02794deea";

CREATE TABLE IF NOT EXISTS public."0d94f51fdca1782b63e4fbe02794deea"
(
    user_id integer NOT NULL,
    endpoint text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "0d94f51fdca1782b63e4fbe02794deea_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."0d94f51fdca1782b63e4fbe02794deea" OWNER to jlrxiqce;