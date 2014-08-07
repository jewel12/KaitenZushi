{-# LANGUAGE OverloadedStrings #-}
module Main where

import KaitenZushi (server)

import qualified Network.EngineIO.Snap as EIOSnap
import qualified Snap.Core as Snap
import qualified Snap.Util.FileServe as Snap
import qualified Snap.Http.Server as Snap
import qualified Network.SocketIO as SocketIO

import Paths_kaitenzushi (getDataDir)

---------------------------------------------------------

main :: IO ()
main = do
  socketIoHandler <- SocketIO.initialize EIOSnap.snapAPI server
  dataDir <- getDataDir
  Snap.quickHttpServe $
    Snap.route [ ("/socket.io", socketIoHandler)
               , ("/", Snap.serveDirectory dataDir)
               ]
