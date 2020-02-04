@echo off
:: Modified from chromium examples

:: Copyright 2014 The Chromium Authors. All rights reserved.
:: Use of this source code is governed by a BSD-style license that can be
:: found in the LICENSE file. 

:: Simple batch script which starts the python service discovery client if in same folder
python "%~dp0/sd-server" %*