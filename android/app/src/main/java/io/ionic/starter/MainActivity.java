package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import android.os.Bundle;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
  this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{

   add(com.getcapacitor.community.facebooklogin.FacebookLogin.class);

  }});


    }



}
