:: Modified from chromium examples

:: Copyright 2014 The Chromium Authors. All rights reserved.
:: Use of this source code is governed by a BSD-style license that can be
:: found in the LICENSE file. 

REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\sd.client" /ve /t REG_SZ /d "%~dp0sd.client.json" /f
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\sd.server" /ve /t REG_SZ /d "%~dp0sd.server.json" /f