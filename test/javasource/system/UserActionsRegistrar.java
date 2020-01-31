package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(splitstringutility.actions.SplitString.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
