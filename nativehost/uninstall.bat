:: Modified from chromium examples

:: Copyright 2014 The Chromium Authors. All rights reserved.
:: Use of this source code is governed by a BSD-style license that can be
:: found in the LICENSE file. 
REG DELETE "HKCU\Software\Google\Chrome\NativeMessagingHosts\sd.client" /f
REG DELETE "HKCU\Software\Google\Chrome\NativeMessagingHosts\sd.server" /f