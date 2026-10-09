import { render } from "@testing-library/react";
import React from "react";
import { EntryView } from ".";

describe("EntryView", () => {
  it("renders empty", () => {
    const { container } = render(<EntryView entry={null} />);
    expect(container.textContent).toBe("");
  });

  it("renders single field", () => {
    const { getByText } = render(<EntryView entry={{ name: "value" }} />);
    expect(getByText("name")).toBeDefined();
    expect(getByText("value")).toBeDefined();
  });

  it("renders multiple fields", () => {
    const { getByText } = render(
      <EntryView entry={{ name: "John", surname: "Doe" }} />,
    );
    expect(getByText("name")).toBeDefined();
    expect(getByText("Doe")).toBeDefined();
    expect(getByText("surname")).toBeDefined();
    expect(getByText("John")).toBeDefined();
  });
});
