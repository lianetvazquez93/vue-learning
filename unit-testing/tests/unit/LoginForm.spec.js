import LoginForm from "../../src/components/LoginForm";
import { mount } from "@vue/test-utils";

describe("LoginForm", () => {
  it("emits an event with a user data payload", () => {
    const wrapper = mount(LoginForm);
    const input = wrapper.find("input[type='text']");
    input.setValue("Lianet Vazquez");
    wrapper.trigger("submit");

    const formSubmittedCalls = wrapper.emitted("formSubmitted");
    expect(formSubmittedCalls).toHaveLength(1);
    const expectedPayload = { name: "Lianet Vazquez" };
    expect(wrapper.emitted("formSubmitted")[0][0]).toMatchObject(
      expectedPayload,
    );
  });
});
