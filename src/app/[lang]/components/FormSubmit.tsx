"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";

export default function FormSubmit({
  placeholder,
  text,
}: {
  placeholder: string;
  text: string;
}) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    if (email === "") {
      setErrorMessage("Preencha seu e-mail");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("E-mail inválido");
      return;
    }

    const res = await fetch(getStrapiURL() + "/api/volunteer-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      setErrorMessage("Email failed to submit.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Obrigado! Entraremos em contato em breve.");
    setEmail("");
  }

  return (
    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 w-full lg:justify-end lg:w-1/3">
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          {successMessage ? (
            <p className="text-green-700 bg-green-300 px-4 py-2 rounded-lg">
              {successMessage}
            </p>
          ) : (
            <div className="group flex w-full focus-within:shadow-md focus-within:transition-shadow rounded-lg">
              <input
                type="email"
                placeholder={placeholder}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={"w-full p-3 rounded-l-lg bg-secondary text-text outline-none"}
              />
              <button
                type="button"
                className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-accent text-secondary dark:bg-violet-400 dark:text-gray-900"
                onClick={handleSubmit}
              >
                {text}
              </button>
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
