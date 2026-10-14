import { useEffect, useState } from "react";

/**
 * Loads a list from the API. `fn` returns an axios promise; the hook unwraps
 * DRF's paginated `{results: []}` shape and re-runs whenever `deps` change.
 */
export function useFetch(fn, deps = []) {
  const [state, setState] = useState({ data: [], loading: true, error: false });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: false }));
    fn()
      .then((res) => {
        if (alive) setState({ data: res.data.results || res.data, loading: false, error: false });
      })
      .catch(() => {
        if (alive) setState({ data: [], loading: false, error: true });
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export function formatDate(value, options) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-GB", options || { day: "numeric", month: "long", year: "numeric" });
}

export function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}
