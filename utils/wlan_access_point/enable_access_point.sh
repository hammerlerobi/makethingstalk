#!/bin/bash

sudo cp -r -v /etc/dhcpcd.ap.conf /etc/dhcpcd.conf

sudo systemctl unmask hostapd
sudo systemctl enable hostapd


read -p "Do you want to REBOOT for the changes to take effect? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    sudo systemctl reboot
fi