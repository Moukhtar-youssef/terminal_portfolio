"use client";

import { useIsMobile } from "@/hooks/useMobile";
import Link from "next/link";
import type React from "react";
import { type JSX, useEffect, useRef, useState } from "react";

type Command = {
  cmd: string;
  desc: string;
};

type Project = {
  name: string;
  description: string;
  github: string;
  preview: string | null;
  number: number;
};

type Response = {
  cmd: string;
  response: JSX.Element;
  id: string;
};

const Commands: Command[] = [
  { cmd: "help", desc: "You obviously already know what this does" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "whoami", desc: "About current user" },
  { cmd: "whois", desc: "Who is Moukhtar" },
  {
    cmd: "welcome",
    desc: "Show the welcome message (don't worry you can always find it in the command history)",
  },
  { cmd: "email", desc: "Send me an email" },
  { cmd: "github", desc: "Show my github" },
  { cmd: "projects", desc: "Show what I have codded" },
  { cmd: "history", desc: "View command history" },
  { cmd: "gui", desc: "Go to my portfolio in GUI" },
];

const Projects: Project[] = [
  {
    name: "Terminal_Portfolio",
    description: "A terminal design website acting as a portfolio",
    github: "https://github.com/Moukhtar-youssef/terminal_portfolio",
    preview: "https://terminal-portfolio-one-tau.vercel.app/",
    number: 2,
  },
  {
    name: "Task_Manager_CLI",
    description:
      "A modern CLI-based task management application built in Go, using the Cobra framework. Task_Tracker lets you quickly manage your to-do list from the terminal — add, edit, delete, and update tasks with ease.",
    github: "https://github.com/Moukhtar-youssef/Task_Manager_CLI",
    preview: null,
    number: 1,
  },
  {
    name: "Expense_Tracker_CLI",
    description:
      "A powerful and minimal command-line tool to track your expenses, budgets, and summaries right from the terminal.",
    github: "https://github.com/Moukhtar-youssef/Expense-Tracker/tree/main",
    preview: null,
    number: 3,
  },
];

const WELCOME_ASCII = [
  "        __  ___            __   __    __                __  __                           ____",
  "       /  |/  /___  __  __/ /__/ /_  / /_____ ______    \\ \\/ /___  __  _______________  / __/",
  "      / /|_/ / __ \\/ / / / //_/ __ \\/ __/ __ `/ ___/     \\  / __ \\/ / / / ___/ ___/ _ \\/ /_  ",
  "     / /  / / /_/ / /_/ / ,< / / / / /_/ /_/ / /         / / /_/ / /_/ (__  |__  )  __/ __/  ",
  "    /_/  /_/\\____/\\__,_/_/|_/_/ /_/\\__/\\__,_/_/         /_/\\____/\\__,_/____/____/\\___/_/     ",
  "                                                                                              ",
];

const WELCOME_ASCII_MOBILE = [
  "    __  ___            __   __    __               ",
  "   /  |/  /___  __  __/ /__/ /_  / /_____ ______ ",
  "  / /|_/ / __ \\/ / / / //_/ __ \\/ __/ __ `/ ___/",
  " / /  / / /_/ / /_/ / ,< / / / / /_/ /_/ / / ",
  "/_/  /_/\\____/\\__,_/_/|_/_/ /_/\\__/\\__,_/_/",
];

const Terminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const WELCOME_ASCII_SECTION = (
    <div className="space-y-4">
      <div className="typewriter">
        <pre className="ascii-pre">
          {(isMobile ? WELCOME_ASCII_MOBILE : WELCOME_ASCII).map((line) => {
            return <div key={crypto.randomUUID()}>{line} </div>;
          })}
        </pre>
      </div>

      <div>Welcome to my terminal portfolio. (Version 1.0.0)</div>

      <div>
        This project's source code can be found in this project's{" "}
        <Link
          href="https://github.com/Moukhtar-youssef/terminal_portfolio"
          target="_blank"
          className="underline"
        >
          GitHub repo
        </Link>
      </div>

      <div>
        For a list of available commands, type <code>help</code>.
      </div>
    </div>
  );

  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Response[]>([
    {
      cmd: "visitor@terminal.Moukhtar.dev:~$ welcome",
      response: WELCOME_ASCII_SECTION,
      id: crypto.randomUUID(),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>(["welcome"]);
  const [pointer, setPointer] = useState(-1);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  const handleResponse = (cmd: string): JSX.Element => {
    switch (cmd.trim()) {
      case "help":
        return (
          <>
            {Commands.map((c) => (
              <div key={c.cmd} className="grid grid-cols-[120px_1fr]">
                <span>{c.cmd}</span>
                <span>- {c.desc}</span>
              </div>
            ))}
          </>
        );

      case "clear":
        setOutputs([]);
        return <span></span>;

      case "whoami":
        return <span>Visitor</span>;

      case "whois":
        return (
          <>
            <div>
              Hi, My name is <strong>Moukhtar youssef</strong>!
            </div>
            <div>I am a full-stack developer based in Szeged,Hungary</div>
          </>
        );

      case "welcome":
        return WELCOME_ASCII_SECTION;

      case "email":
        window.open("mailto:" + "moukhtar.youssef06@gmail.com", "_self");
        return <span>moukhtar.youssef06@gmail.com </span>;

      case "github":
        window.open("https://github.com/Moukhtar-youssef", "_blank");
        return <span>https://github.com/Moukhtar-youssef</span>;

      case "history":
        return (
          <>
            {cmdHistory.map((c) => (
              <div key={crypto.randomUUID()}>{c}</div>
            ))}
          </>
        );

      case "gui":
        return <span>Sorry the gui website is still under development</span>;

      case "projects": {
        const sortedProjects = Projects.sort((a, b) => a.number - b.number);
        return (
          <>
            {sortedProjects.map((p) => (
              <div
                key={p.name}
                className="mb-4 border rounded-md border-gray-500 p-4"
              >
                <div className="text-lg font-semibold">{p.name}</div>
                <div>{p.description}</div>
                <div>
                  <a href={p.github} target="_blank" className="underline">
                    GitHub Repo
                  </a>
                  {p.preview && (
                    <>
                      {" | "}
                      <a href={p.preview} target="_blank" className="underline">
                        Live Preview
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        );
      }
      default:
        return <span>Command not found: {cmd}</span>;
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCmdHistory((prev) => [...prev, input]);
    setOutputs((prev) => [
      ...prev,
      {
        cmd: `visitor@terminal.Moukhtar.dev:~$ ${input}`,
        response: handleResponse(input),
        id: crypto.randomUUID(),
      },
    ]);
    setInput("");
    setPointer(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (pointer + 1 >= cmdHistory.length) return;
      const newPointer = pointer + 1;
      setPointer(newPointer);
      setInput(cmdHistory[cmdHistory.length - 1 - newPointer]);
    }

    if (e.key === "ArrowDown") {
      if (pointer <= 0) {
        setPointer(-1);
        setInput("");
        return;
      }
      const newPointer = pointer - 1;
      setPointer(newPointer);
      setInput(cmdHistory[cmdHistory.length - 1 - newPointer]);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const foundCmd = Commands.find((c) => c.cmd.startsWith(input));
      if (foundCmd) {
        setInput(foundCmd.cmd);
      }
    }
  };

  return (
    <div className="container px-5 py-2" ref={containerRef}>
      <div className="terminal">
        {outputs.map((output) => (
          <div key={output.id} className="mb-4">
            <div>{output.cmd}</div>
            <div>{output.response}</div>
          </div>
        ))}
      </div>

      <form
        className="mt-2 flex items-center"
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputRef.current?.focus();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            inputRef.current?.focus();
          }
        }}
      >
        <span>visitor@terminal.Moukhtar.dev:~$ </span>
        <span> </span>
        <input
          ref={inputRef}
          title="terminal-input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input cursor pl-2"
        />
      </form>
    </div>
  );
};

export default Terminal;
